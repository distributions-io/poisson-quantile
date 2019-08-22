declare type Options = {
  /** mean parameter, default=1 */
  lambda?: number;
  /** boolean indicating if the function should return a new data structure, default=true */
  copy?: boolean;
  /** accessor function for accessing array values */
  acessor?: Function;
  /** deep get/set key path */
  path?: string;
  /** deep get/set key path separator, default="." */
  sep?: string;
  /** output data type, default="float64" */
  dtype?: string;
}

/**
 * Evaluates the quantile function for a Poisson distribution.
 * @param p input value
 * @param options function options
 * @returns quantile function value(s)
 */
declare function quantile(p: number, options?: Options): number;
/**
 * Evaluates the quantile function for a Poisson distribution.
 * @param p input value
 * @param options function options
 * @returns quantile function value(s)
 */
declare function quantile(p: number[], options?: Options): number[];
/**
 * Evaluates the quantile function for a Poisson distribution.
 * @param p input value
 * @param options function options
 * @returns quantile function value(s)
 */
declare function quantile(p: Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array,
  options?: Options):
  Int8Array|Uint8Array|Uint8ClampedArray|Int16Array|Uint16Array|Int32Array|Uint32Array|Float32Array|Float64Array;
  

export default quantile;
