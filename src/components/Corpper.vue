<script setup lang="ts">
import { ref, onMounted } from 'vue'

const canvasRef = ref(null)
const imgRef = ref(null)
const polygons = ref([]) // 存储多个选区的顶点数组
const selectedIndex = ref(null) // 当前选中的选区索引
const isDrawing = ref(false)
const draggingPoint = ref(null) // 记录正在拖动的点索引

// 载入图片
const loadImage = () => {
  const img = imgRef.value
  img.crossOrigin = 'anonymous'
  img.onload = () => {
    const canvas = canvasRef.value
    const ctx = canvas.getContext('2d')
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
    drawPolygons() // 绘制所有选区
  }
}

// **鼠标点击事件（Shift 键新增点）**
const handleClick = (event) => {
  // handleCanvasClick(event)
  if (!isDrawing.value || selectedIndex.value === null || !event.shiftKey) return

  const rect = canvasRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  polygons.value[selectedIndex.value].push({ x, y })
  drawPolygons()
}

// **右键删除点**
const handleRightClick = (event) => {
  event.preventDefault() // 防止右键菜单弹出

  if (selectedIndex.value === null) return

  const rect = canvasRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  // 找到最近的点
  const pointIndex = polygons.value[selectedIndex.value].findIndex(
    (point) => Math.hypot(point.x - x, point.y - y) < 10,
  )

  if (pointIndex !== -1 && polygons.value[selectedIndex.value].length > 3) {
    polygons.value[selectedIndex.value].splice(pointIndex, 1) // 删除该点
    drawPolygons()
  }
}

// **绘制所有选区**
const drawPolygons = () => {
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(imgRef.value, 0, 0)

  polygons.value
    .filter((p) => p.length)
    .forEach((polygon, index) => {
      ctx.beginPath()
      ctx.moveTo(polygon[0].x, polygon[0].y)
      polygon.forEach((point) => ctx.lineTo(point.x, point.y))
      ctx.closePath()
      ctx.strokeStyle = index === selectedIndex.value ? 'green' : 'red' // 当前选区用绿色标识
      ctx.lineWidth = 2
      ctx.stroke()

      // 画可拖拽的点
      polygon.forEach((point) => {
        ctx.beginPath()
        ctx.arc(point.x, point.y, 6, 0, Math.PI * 2)
        ctx.fillStyle = 'blue'
        ctx.fill()
      })
    })
}

// **检测点击选区**
const detectClickOnPolygon = (x, y) => {
  for (let i = 0; i < polygons.value.length; i++) {
    const polygon = polygons.value[i]
    let inside = false
    for (let j = 0, k = polygon.length - 1; j < polygon.length; k = j++) {
      const xi = polygon[j].x,
        yi = polygon[j].y
      const xj = polygon[k].x,
        yj = polygon[k].y

      const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
      if (intersect) inside = !inside
    }
    if (inside) return i // 如果点击在多边形内，返回选区索引
  }
  return -1 // 点击不在任何选区内
}

// **点击事件 - 选择选区**
const handleCanvasClick = (event) => {
  const rect = canvasRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const index = detectClickOnPolygon(x, y)
  console.log(index, selectedIndex.value)
  if (index !== -1 && index !== selectedIndex.value) {
    selectedIndex.value = index // 切换到选中的选区
    drawPolygons()
    return
  }
  handleClick(event)
}

// **拖拽事件**
const startDrag = (event) => {
  if (selectedIndex.value === null) return

  const rect = canvasRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  // 找到最近的点
  draggingPoint.value = polygons.value[selectedIndex.value].findIndex(
    (point) => Math.hypot(point.x - x, point.y - y) < 10,
  )

  if (draggingPoint.value !== -1) {
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
  }
}

// **拖动时更新坐标**
const onDrag = (event) => {
  if (draggingPoint.value === -1) return

  const rect = canvasRef.value.getBoundingClientRect()
  let x = event.clientX - rect.left
  let y = event.clientY - rect.top

  // 限制坐标在 canvas 内部
  x = Math.max(0, Math.min(canvasRef.value.width, x))
  y = Math.max(0, Math.min(canvasRef.value.height, y))

  polygons.value[selectedIndex.value][draggingPoint.value] = {
    x,
    y,
  }

  drawPolygons()
}

// **停止拖拽**
const stopDrag = () => {
  draggingPoint.value = -1
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

// **截图裁剪**
const capturePolygon = () => {
  const data = polygons.value.filter((polygon) => polygon.length)
  if (!data.length) {
    alert('请先绘制选区')
    return
  }
  const index = polygons.value.findIndex((polygon) => polygon.length && polygon.length < 3)
  if (index !== -1) {
    // alert(`选区${index + 1}少于3个点`);
    alert(`选区不能少于3个点`)
    return
  }

  const canvas = canvasRef.value

  // 创建临时 canvas
  const tempCanvas = document.createElement('canvas')
  const tempCtx = tempCanvas.getContext('2d')
  tempCanvas.width = canvas.width
  tempCanvas.height = canvas.height

  // 清空临时 canvas
  // **填充白色背景**
  tempCtx.fillStyle = 'white'
  tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height)
  // 画出多边形
  polygons.value.forEach((polygon) => {
    // const polygon = polygons.value[selectedIndex.value];
    tempCtx.save() // 先保存当前状态
    tempCtx.beginPath()
    polygon.forEach((point, index) => {
      if (index === 0) {
        tempCtx.moveTo(point.x, point.y)
      } else {
        tempCtx.lineTo(point.x, point.y)
      }
    })
    tempCtx.closePath()
    tempCtx.clip() // 应用裁剪区域

    // **填充选区为白色**
    tempCtx.fillStyle = 'black'
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height)
    // tempCtx.drawImage(canvas, 0, 0); // 绘制原 canvas 内容到临时 canvas
    tempCtx.restore() // 恢复状态
  })

  // 重新绘制图片
  // tempCtx.drawImage(canvas, 0, 0);

  // 生成图片
  try {
    const image = tempCanvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = image
    link.download = 'polygon_capture.png'
    link.click()
  } catch (err) {
    console.error('截图失败:', err)
    alert('截图失败，可能是跨域问题！')
  }
}

// **重置选区**
const resetSelection = () => {
  polygons.value = []
  selectedIndex.value = null
  isDrawing.value = false
  // 重新设置图片的 src 来触发 onload
  const img = imgRef.value
  const imgSrc = img.src // 保存当前图片的 src
  img.src = '' // 清空 src
  img.src = imgSrc // 重新设置 src 触发 onload
}

// **新增选区**
const addNewPolygon = () => {
  // 当前选区未操作不新增
  if (selectedIndex.value !== null && !polygons.value[selectedIndex.value].length) {
    return
  }
  polygons.value.push([])
  selectedIndex.value = polygons.value.length - 1
  isDrawing.value = true
  console.log(selectedIndex.value, polygons.value[selectedIndex.value])
  drawPolygons()
}

// **切换选区**
const switchPolygon = (index) => {
  selectedIndex.value = index
  drawPolygons()
}

// **删除选区**
const deletePolygon = () => {
  if (selectedIndex.value !== null) {
    polygons.value.splice(selectedIndex.value, 1)
    selectedIndex.value = null
    drawPolygons()
  }
}

onMounted(loadImage)
</script>

<template>
  <div>
    <img
      ref="imgRef"
      src="https://pic.616pic.com/photoone/00/00/15/618ce630e73691587.jpg!/fw/1120"
      crossorigin="anonymous"
      style="display: none"
    />
    <canvas
      ref="canvasRef"
      @click="handleCanvasClick"
      @contextmenu="handleRightClick"
      @mousedown="startDrag"
    ></canvas>
    <button @click="addNewPolygon">新增选区</button>
    <button @click="capturePolygon">截图</button>
    <button @click="resetSelection">重置</button>
    <button @click="deletePolygon">删除选区</button>
    <div v-for="(polygon, index) in polygons" :key="index">
      <button @click="switchPolygon(index)">切换选区 {{ index + 1 }}</button>
    </div>
    <p>
      点击选区可切换，按住
      <strong>Shift</strong> 键点击可新增顶点，右键可删除顶点，鼠标拖拽可调整顶点位置。
    </p>
  </div>
</template>

<style scoped>
canvas {
  border: 1px solid #000;
}
button {
  margin: 5px;
}
</style>
