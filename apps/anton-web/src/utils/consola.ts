import consola from "consola";

export const createLogger = (context: string) => {
  return consola.create({ level: 5, defaults: { tag: context } });
};
