// 验证空值
export const validateNullFn = (rule, value, callback) => {
  const { field } = rule;
  value = value.trim();
  value ? callback() : callback(new Error(`${field}不能为空`));
  return value ? true : false;
};
