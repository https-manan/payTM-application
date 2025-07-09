const z = require('zod');

const authentication = z.object({
  username: z.string()
    .min(3)
    .max(30)
    .trim()
    .toLowerCase(),

  password: z.string()
    .min(6),

  firstName: z.string()
    .max(50)
    .trim(),

  lastName: z.string()
    .max(50)
    .trim()
});

module.exports = authentication;
