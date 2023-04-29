import { createApp } from 'vue'
import { Form, Field, CellGroup, Button, Toast, NavBar, Icon, Uploader, Dialog, Loading } from 'vant'
import './style.css'
import 'vant/lib/index.css'
import App from './App.vue'
import { router } from './router'

const app = createApp(App)

app.use(Form)
app.use(Field)
app.use(Button)
app.use(CellGroup)
app.use(Toast)
app.use(NavBar)
app.use(Icon)
app.use(Uploader)
app.use(Dialog)
app.use(Loading)

app.use(router)
app.mount('#app')
