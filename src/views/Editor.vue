<template>
  <StickyNavbar/>
  
  <div class="editor-container">
    <div class="editor-header">
      <el-input
        v-model="articleTitle"
        placeholder="Enter article title..."
        class="title-input"
      />
      
      <div class="article-meta">
        <el-select 
          v-model="selectedType" 
          placeholder="Select category"
          class="type-select"
        >
          <el-option
            v-for="type in articleTypes"
            :key="type.id"
            :label="type.name"
            :value="type.id"
          />
        </el-select>
        
        <el-select
          v-model="selectedTags"
          multiple
          collapse-tags
          placeholder="Select tags"
          class="tag-select"
        >
          <el-option
            v-for="tag in availableTags"
            :key="tag"
            :label="tag"
            :value="tag"
          />
        </el-select>
      </div>
    </div>

    <div class="editor-main">
      <div class="editor-wrapper">
        <Toolbar
          class="editor-toolbar"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          mode="default"
        />
        <Editor
          class="editor-content"
          v-model="editorContent"
          :defaultConfig="editorConfig"
          mode="default"
          @onCreated="handleCreated"
        />
      </div>
    </div>

    <div class="editor-footer">
      <el-button 
        @click="goBack"
      >
        Cancel
      </el-button>
      <el-button 
        type="primary" 
        @click="publishArticle"
      >
        Publish
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import StickyNavbar from '../components/Navbar.vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import { ElMessage } from 'element-plus'

const router = useRouter()
const articleTitle = ref('')
const selectedType = ref('')
const selectedTags = ref([])
const editorContent = ref('')

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 文章分类
const articleTypes = ref([
  { id: 1, name: 'Learning' },
  { id: 2, name: 'Technology' },
  { id: 3, name: 'Competition' },
  { id: 4, name: 'Interview' },
  { id: 5, name: 'AI' },
  { id: 6, name: 'Life' }
])

// 可选标签
const availableTags = ref([
  'Vue', 'React', 'TypeScript', 'JavaScript', 
  'Node.js', 'Python', 'Java', 'Algorithm',
  'Frontend', 'Backend', 'Fullstack', 'Interview'
])

// 工具栏配置
const toolbarConfig = {
  excludeKeys: [
    'uploadImage',
    'uploadVideo',
    'insertTable'
  ]
}

// 编辑器配置
const editorConfig = {
  placeholder: 'Enter content...',
  autoFocus: false
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor
}

const goBack = () => {
  router.back()
}

const publishArticle = () => {
  if (!articleTitle.value) {
    ElMessage.warning('Please enter article title')
    return
  }
  if (!selectedType.value) {
    ElMessage.warning('Please select a category')
    return
  }
  if (selectedTags.value.length === 0) {
    ElMessage.warning('Please select at least one tag')
    return
  }
  if (!editorContent.value) {
    ElMessage.warning('Please enter article content')
    return
  }

  // TODO: 发送文章数据到后端
  console.log({
    title: articleTitle.value,
    type: selectedType.value,
    tags: selectedTags.value,
    content: editorContent.value
  })

  // 发布成功后跳转
  router.push('/my-blog')
}
</script>

<style scoped>
.editor-container {
  max-width: 80vw;
  height: auto;
  margin: 80px auto 40px;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.editor-header {
  margin-bottom: 30px;
}

.title-input {
  margin-bottom: 20px;
}

.title-input :deep(.el-input__wrapper) {
  padding: 8px 15px;
  font-size: 24px;
  box-shadow: none;
  border-bottom: 2px solid #eee;
  border-radius: 0;
}

.title-input :deep(.el-input__wrapper:hover),
.title-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: none;
  border-bottom-color: var(--el-color-primary);
}

.article-meta {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.type-select,
.tag-select {
  min-width: 200px;
}

.editor-wrapper {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
}

.editor-toolbar {
  border-bottom: 1px solid #dcdfe6;
  background-color: #f5f7fa;
}

.editor-content {
  height: 600px;
  overflow-y: auto;
}

:deep(.w-e-text-container) {
  background-color: white;
}

:deep(.w-e-toolbar) {
  border: none !important;
  padding: 5px 10px;
}

:deep(.w-e-bar-item) {
  border-radius: 4px;
}

:deep(.w-e-bar-item:hover) {
  background-color: #e4e7ed;
}

.editor-footer {
  display: flex;
  justify-content: flex-end;
  gap: 15px;
  padding: 30px 0 0;
  margin-top: 20px;
  border-top: 1px solid #eee;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .editor-container {
    margin: 60px 20px;
  }
}

@media (max-width: 768px) {
  .article-meta {
    flex-direction: column;
    gap: 10px;
  }
  
  .type-select,
  .tag-select {
    width: 100%;
  }
}
</style>
