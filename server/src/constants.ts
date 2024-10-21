/**
 * Generate Code
 * @returns {string}
 */

export function generateCode(length: number): number {
  let code: any;

  do {
    code = '';
    for (let i = 0; i < length; i++) {
      code += Math.floor(Math.random() * 10).toString();
    }
  } while (code.startsWith('0'));

  return parseInt(code);
}
