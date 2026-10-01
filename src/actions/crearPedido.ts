// @/actions/crearPedido.ts
"use server";
import { headers } from "next/headers";
import { isIP } from "node:net";
import { getClient } from "@/lib/db";
import { checkRateLimit } from "@/lib/ratelimit";

type ItemInput = {
  id: string;
  talla: string;
  color: string | string[];
  cantidad: number;
};
type FormInput = {
  nombre: string;
  celular: string;
  ciudad: string;
  direccion: string;
  barrio: string;
  metodo: string;
  nota: string;
};

export async function crearPedido(items: ItemInput[], form: FormInput) {
  if (!items.length) throw new Error("Carrito vacío");
  if (!form.nombre || !form.celular || !form.ciudad || !form.direccion)
    throw new Error("Faltan datos");
  if (!["transferencia", "efectivo"].includes(form.metodo)) throw new Error("Método inválido");

  const h = await headers();
  const rawIp = h.get("x-forwarded-for")?.split(",")[0].trim() ?? "";
  const ip = isIP(rawIp) ? rawIp : null;
  const userAgent = h.get("user-agent");

  const rl = await checkRateLimit("checkout", ip ?? "sin-ip");
  if (!rl.success) {
    return {
      ok: false as const,
      reason: "rate_limited" as const,
      retryAt: rl.resetAt as number,
    };
  }

  const client = await getClient();
  try {
    await client.query("BEGIN");

    const ids = [...new Set(items.map((i) => i.id))];
    const { rows } = await client.query(
      `SELECT id, nombre, precio FROM productos WHERE id = ANY($1::uuid[]) AND visible = true`,
      [ids],
    );
    const porId = new Map(rows.map((r) => [r.id, r]));

    let subtotal = 0;
    const lineas = items.map((it) => {
      const p = porId.get(it.id);
      const cantidad = Math.floor(Number(it.cantidad));
      if (!p) throw new Error("Producto no disponible");
      if (!(cantidad > 0 && cantidad <= 99)) throw new Error("Cantidad inválida");
      const precio = Number(p.precio);
      subtotal += precio * cantidad;
      return {
        productoId: p.id as string,
        nombre: p.nombre as string,
        talla: String(it.talla),
        color: Array.isArray(it.color) ? it.color.join(", ") : String(it.color),
        cantidad,
        precio,
      };
    });

    const {
      rows: [pedido],
    } = await client.query(
      `INSERT INTO pedidos
         (nombre, telefono, direccion, barrio, ciudad, comentario,
          subtotal, total, metodo_pago, ip_address, user_agent)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$7,$8,$9,$10)
       RETURNING id`,
      [
        form.nombre.trim(),
        form.celular.trim(),
        form.direccion.trim(),
        form.barrio?.trim() || null,
        form.ciudad.trim(),
        form.nota?.trim() || null,
        subtotal,
        form.metodo,
        ip,
        userAgent,
      ],
    );

    for (const l of lineas) {
      await client.query(
        `INSERT INTO pedido_items
           (pedido_id, producto_id, producto_nombre, talla_nombre, color_nombre,
            cantidad, precio_unitario, subtotal)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          pedido.id,
          l.productoId,
          l.nombre,
          l.talla,
          l.color,
          l.cantidad,
          l.precio,
          l.precio * l.cantidad,
        ],
      );
    }

    await client.query("COMMIT");
    return { ok: true as const, id: pedido.id as string, subtotal, lineas };
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
