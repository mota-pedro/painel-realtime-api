export function maskCnpj(cnpj = '') {
  if (!cnpj) return '';

  const digits = cnpj.replace(/\D/g, '');

  if (digits.length !== 14) return cnpj;

  return `**.***.${digits.substring(5, 8)}/${digits.substring(8, 12)}-**`;
}