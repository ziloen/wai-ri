


export type Not<T extends boolean> = T extends true ? false : true



export type Or<B1 extends boolean, B2 extends true> =
  B1 extends true ? true :
  B2 extends true ? true :
  false



export type And<B1 extends boolean, B2 extends boolean> =
  B1 extends false ? false :
  B2 extends false ? false :
  true
