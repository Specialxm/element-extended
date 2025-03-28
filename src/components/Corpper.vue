<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'

interface Point {
  x: number
  y: number
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const imgRef = ref<HTMLImageElement | null>(null)
const polygons: Ref<Point[][]> = ref([])
const selectedIndex: Ref<number | null> = ref(null)
const isDrawing = ref(false)
const draggingPoint: Ref<number | null> = ref(null)

const loadImage = () => {
  const img = imgRef.value
  if (!img) return

  img.crossOrigin = 'anonymous'
  img.onload = () => {
    const canvas = canvasRef.value
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
    drawPolygons()
  }
}

const handleClick = (event: MouseEvent) => {
  if (!isDrawing.value || selectedIndex.value === null || !event.shiftKey || !canvasRef.value)
    return

  const rect = canvasRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  polygons.value[selectedIndex.value].push({ x, y })
  drawPolygons()
}

const handleRightClick = (event: MouseEvent) => {
  event.preventDefault()
  if (selectedIndex.value === null || !canvasRef.value) return

  const rect = canvasRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const pointIndex = polygons.value[selectedIndex.value].findIndex(
    (point) => Math.hypot(point.x - x, point.y - y) < 10,
  )

  if (pointIndex !== -1 && polygons.value[selectedIndex.value].length > 3) {
    polygons.value[selectedIndex.value].splice(pointIndex, 1)
    drawPolygons()
  }
}

const drawPolygons = () => {
  const canvas = canvasRef.value
  const img = imgRef.value
  if (!canvas || !img) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(img, 0, 0)

  polygons.value
    .filter((p) => p.length)
    .forEach((polygon, index) => {
      ctx.beginPath()
      ctx.moveTo(polygon[0].x, polygon[0].y)
      polygon.forEach((point) => ctx.lineTo(point.x, point.y))
      ctx.closePath()
      ctx.strokeStyle = index === selectedIndex.value ? 'green' : 'red'
      ctx.lineWidth = 2
      ctx.stroke()

      polygon.forEach((point) => {
        ctx.beginPath()
        ctx.arc(point.x, point.y, 6, 0, Math.PI * 2)
        ctx.fillStyle = 'blue'
        ctx.fill()
      })
    })
}

const detectClickOnPolygon = (x: number, y: number): number => {
  for (let i = 0; i < polygons.value.length; i++) {
    const polygon = polygons.value[i]
    let inside = false
    for (let j = 0, k = polygon.length - 1; j < polygon.length; k = j++) {
      const xi = polygon[j].x
      const yi = polygon[j].y
      const xj = polygon[k].x
      const yj = polygon[k].y

      const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
      if (intersect) inside = !inside
    }
    if (inside) return i
  }
  return -1
}

const handleCanvasClick = (event: MouseEvent) => {
  if (!canvasRef.value) return

  const rect = canvasRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const index = detectClickOnPolygon(x, y)
  if (index !== -1 && index !== selectedIndex.value) {
    selectedIndex.value = index
    drawPolygons()
    return
  }
  handleClick(event)
}

const startDrag = (event: MouseEvent) => {
  if (selectedIndex.value === null || !canvasRef.value) return

  const rect = canvasRef.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  draggingPoint.value = polygons.value[selectedIndex.value].findIndex(
    (point) => Math.hypot(point.x - x, point.y - y) < 10,
  )

  if (draggingPoint.value !== -1) {
    document.addEventListener('mousemove', onDrag)
    document.addEventListener('mouseup', stopDrag)
  }
}

const onDrag = (event: MouseEvent) => {
  if (draggingPoint.value === null || selectedIndex.value === null || !canvasRef.value) return

  const rect = canvasRef.value.getBoundingClientRect()
  let x = event.clientX - rect.left
  let y = event.clientY - rect.top

  x = Math.max(0, Math.min(canvasRef.value.width, x))
  y = Math.max(0, Math.min(canvasRef.value.height, y))

  polygons.value[selectedIndex.value][draggingPoint.value] = { x, y }
  drawPolygons()
}

const stopDrag = () => {
  draggingPoint.value = null
  document.removeEventListener('mousemove', onDrag)
  document.removeEventListener('mouseup', stopDrag)
}

const capturePolygon = () => {
  const data = polygons.value.filter((polygon) => polygon.length)
  if (!data.length) {
    alert('请先绘制选区')
    return
  }

  const index = polygons.value.findIndex((polygon) => polygon.length && polygon.length < 3)
  if (index !== -1) {
    alert('选区不能少于3个点')
    return
  }

  const canvas = canvasRef.value
  if (!canvas) return

  const tempCanvas = document.createElement('canvas')
  const tempCtx = tempCanvas.getContext('2d')
  if (!tempCtx) return

  tempCanvas.width = canvas.width
  tempCanvas.height = canvas.height

  tempCtx.fillStyle = 'white'
  tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height)

  polygons.value.forEach((polygon) => {
    tempCtx.save()
    tempCtx.beginPath()
    polygon.forEach((point, index) => {
      if (index === 0) {
        tempCtx.moveTo(point.x, point.y)
      } else {
        tempCtx.lineTo(point.x, point.y)
      }
    })
    tempCtx.closePath()
    tempCtx.clip()
    tempCtx.fillStyle = 'black'
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height)
    tempCtx.restore()
  })

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

const resetSelection = () => {
  polygons.value = []
  selectedIndex.value = null
  isDrawing.value = false
  const img = imgRef.value
  if (!img) return
  const imgSrc = img.src
  img.src = ''
  img.src = imgSrc
}

const addNewPolygon = () => {
  if (selectedIndex.value !== null && !polygons.value[selectedIndex.value]?.length) {
    return
  }
  polygons.value.push([])
  selectedIndex.value = polygons.value.length - 1
  isDrawing.value = true
  drawPolygons()
}

const switchPolygon = (index: number) => {
  selectedIndex.value = index
  drawPolygons()
}

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
