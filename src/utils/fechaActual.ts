export const hoy: string = new Date().toISOString().split("T")[0];

const mañana: Date = new Date();
mañana.setDate(mañana.getDate() + 1);
export const fechaMañana: string = mañana.toISOString().split("T")[0];
