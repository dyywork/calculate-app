<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
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
// 随机生成结果为20以内10以上的加法
const generateAdditionQuestionInRange=(minResult = 10, maxResult = 20) => {
    // 生成第一个加数，确保两数之和能落在指定范围内
    var num1 = Math.floor(Math.random() * (maxResult - minResult + 1)) + minResult - 1;
    // 生成第二个加数，确保总和不超过maxResult且至少为minResult
    var num2 = Math.min(Math.floor(Math.random() * (maxResult - num1 + 1)), maxResult - num1);
    
    // 返回加法题目的字符串表示
    return `${num1} + ${num2} = `;
}


const generateSubtractionQuestionWithMinuendInRange = (minuendMin = 10, minuendMax = 20) => {
    // 生成被减数，确保在指定范围内
    var minuend = Math.floor(Math.random() * (minuendMax - minuendMin + 1)) + minuendMin;
    // 生成减数，确保结果非负
    var subtrahend = Math.floor(Math.random() * (minuend - minuendMin + 1)) + minuendMin - 1;
    // 确保减数不等于被减数，避免结果为0的情况（如果需要包含0为结果，请移除此行）
    while (subtrahend >= minuend) {
        subtrahend = Math.floor(Math.random() * (minuend - minuendMin + 1)) + minuendMin - 1;
    }
    
    // 返回减法题目的字符串表示
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
  <el-button @click="list = []">清空</el-button>
  <el-button v-print="'print-box'">打印</el-button>
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
