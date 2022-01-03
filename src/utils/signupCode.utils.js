function generateCode(max = 8) {
  let code = '';
  const caracteres =
    'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ012346789';

  for (let i = 0; i < max; i++) {
    const index = Math.floor(Math.random() * caracteres.length);
    code += caracteres[index];
  }

  return code;
}

module.exports = {
  generateCode,
};
