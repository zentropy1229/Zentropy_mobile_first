import { ref } from 'vue'

const errors = ref([])

const ruleCombine = {
  passwordRule: {
    lengthRule: {
      regex: /^.{6,20}$/,
      text: '密碼長度需為6-20個字元'
    },
    caseRule: {
      regex: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      text: '密碼需包含大小寫英文及數字'
    },
    characterRule: {
      regex: /^[^\u4e00-\u9fff]+$/,
      text: '密碼不可包含中文'
    }
  },
  emailRule: {
    formatRule: {
      regex: /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/,
      text: '電子郵件與規則不符'
    }
  },
  usernameRule: {
    formatRule: {
      regex: /^.{1,20}$/,
      text: '最多為20個字元'
    }
  },
  phoneRule: {
    formateRule: {
      regex: /^09\d{8}$/,
      text: '請輸入正確的手機號碼'
    }
  },
  genderRule: {
    formatRule: {
      regex: /^((男生)|(女生)|(不分性別))$/,
      text: '請輸入正確的性別'
    }
  }
}

export default function (type, validateData) {
  errors.value = []
  const label = type.split('Rule')[0]
  if (!validateData) {
    errors.value.push('欄位不能為空')
    return {
      [label]: errors.value
    }
  }
  for (const rule in ruleCombine[type]) {
    const regex = ruleCombine[type][rule].regex
    const errorText = ruleCombine[type][rule].text
    !regex.test(validateData)
      ? errors.value.push(errorText)
      : errors.value.indexOf(errorText) > -1
        ? errors.value.splice(errors.value.indexOf(errorText), 1)
        : errors.value.slice(0)
  }
  return {
    [label]: errors.value
  }
}
