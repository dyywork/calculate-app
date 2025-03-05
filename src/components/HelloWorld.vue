<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})
const minValue = ref(10)
const maxValue = ref(20)


const count = ref(0)

const generateCustomRange = () => {
  let num = page.value * 120
  for (let i = 0; i < num; i++) {
    if (Math.floor(Math.random() * 10) + 1 > 5) {
      list.value.push(generateAdditionQuestionInRange(minValue.value, maxValue.value))
    } else {
      list.value.push(generateSubtractionQuestionWithMinuendInRange(minValue.value, maxValue.value))
    }
  }
  // 去重
  list.value = [...new Set(list.value)]
}
// 随机生成结果10以内的加减法
const increment = () => {
   // 生成两个1到10之间的整数
   var num1 = Math.floor(Math.random() * 10) + 1;
    var num2 = Math.floor(Math.random() * 10) + 1;
    
    // 随机决定进行加法还是减法运算
    var operation = Math.random() < 0.5 ? '-' : '+';
    
    // 计算结果，确保结果在0到10之间
    var result = operation === '+' ? num1 + num2 : num1 - num2;
    // 确保减法时不出现负数结果
    if (operation === '-' && result < 0) {
        num1 = num2 > num1 ? num2 : num1;
        num2 = num1 > num2 ? num1 : num2;
        result = num1 - num2;
    }
    
    return `${num1} ${operation} ${num2} = `;
}
const generateAdditionQuestionInRange = (minResult = 10, maxResult = 20) => {
    var num1 = Math.floor(Math.random() * (maxResult - minResult + 1)) + minResult - 1;
    var num2 = Math.min(Math.floor(Math.random() * (maxResult - num1 + 1)), maxResult - num1);
    return `${num1} + ${num2} = `;
}

const generateSubtractionQuestionWithMinuendInRange = (minuendMin = 10, minuendMax = 20) => {
    var minuend = Math.floor(Math.random() * (minuendMax - minuendMin + 1)) + minuendMin;
    var subtrahend = Math.floor(Math.random() * (minuend - minuendMin + 1)) + minuendMin - 1;
    while (subtrahend >= minuend) {
        subtrahend = Math.floor(Math.random() * (minuend - minuendMin + 1)) + minuendMin - 1;
    }
    return `${minuend} - ${subtrahend} = `;
}
const list = ref([])
let page = ref(1)

const handleSubmit = () => {
  let num = page.value * 120

  for (let i = 0; i < num; i++) {
    list.value.push(increment())
  }

  // 去重
  list.value = [...new Set(list.value)]
}

const handelTwo = () => {
  let num = page.value * 120
  for (let i = 0; i < num; i++) {
    if (Math.floor(Math.random() * 10) + 1 >5) {
      list.value.push(generateAdditionQuestionInRange())
    } else{
      list.value.push(generateSubtractionQuestionWithMinuendInRange())
    }
  }
  // 去重
  list.value = [...new Set(list.value)]
}

</script>

<template>
  <el-row type="flex">
    <el-button @click="handleSubmit">生成10以内的加减法</el-button>
  <el-button @click="handelTwo">生成20以内的加减法</el-button>
  
  页数： <el-input-number v-model="page" />
  最小值： <el-input-number v-model="minValue" :min="1" />
  最大值： <el-input-number v-model="maxValue" :min="minValue" />
  <el-button @click="generateCustomRange">生成自定义范围内的加减法</el-button>
  <el-button @click="list = []">清空</el-button>
  <el-button v-print="'print-box'" type="primary">打印</el-button>
  </el-row>
  
  <el-row id="print-box">
    <el-col :span="6" style="margin-bottom: 10px;" v-for="item in list">{{ item }}</el-col>
  </el-row>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
