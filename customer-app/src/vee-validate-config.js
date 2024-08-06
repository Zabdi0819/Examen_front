import { defineRule, configure } from 'vee-validate';
import * as rules from '@vee-validate/rules';

// Define las reglas de validación
Object.keys(rules).forEach(rule => {
  defineRule(rule, rules[rule]);
});

// Configura mensajes globales
configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `El campo ${ctx.field} es requerido.`,
      email: `El campo ${ctx.field} debe ser un correo electrónico válido.`,
    };
    return messages[ctx.rule.name] ? messages[ctx.rule.name] : `El campo ${ctx.field} no es válido.`;
  }
});
