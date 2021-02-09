import { useState } from 'react';

export function useInput(initVal) {
  const [value, setValue] = useState(initVal);

  const onChangeText = (e) => {
    setValue(() => e.target.value);
  };
  const cleanValue = () => {
    setValue('');
  };

  return {
    bind: { value, onChange: onChangeText },
    value,
    setValue: onChangeText,
    cleanValue,
  };
}
