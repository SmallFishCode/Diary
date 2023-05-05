<template>
    <div class="login">
        <div class="login__title">烂笔头</div>
        <van-form class="login__form" @submit="onSubmit">
            <van-cell-group inset>
                <van-field
                    v-model="username"
                    name="username"
                    label="username"
                    placeholder="username"
                    :rules="[{ required: true, message: '请填写用户名' }]"
                />
                <van-field
                    v-model="password"
                    type="password"
                    name="password"
                    label="password"
                    placeholder="password"
                    :rules="[{ required: true, message: '请填写密码' }]"
                />
            </van-cell-group>
            <div style="margin: 32px;">
                <van-button
                    round
                    block
                    type="default"
                    native-type="submit"
                >
                    Go
                </van-button>
            </div>
        </van-form>
        <div class="login__register" @click="handleRegister">新用户?点击此处去注册</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { showFailToast } from 'vant'
import { useRouter } from 'vue-router'
import { loginReq, LoginReq } from '@/server/login'

const username = ref('')
const password = ref('')

const router = useRouter()

const onSubmit = (values: LoginReq) => {
    if (values) {
        loginReq(values).then((res) => {
            if (res.result === 200) {
                username.value = ''
                password.value = ''
                router.push({ path: '/home' })
            }
        }).catch((err) => {
            console.log(err, 'login 页面报错')
            showFailToast(err)
        })
    }
}

const handleRegister = () => {
    router.push({ path: '/register' })
}

</script>

<style scoped lang="less">
.login {
    padding: 19px;
    height: 100vh;
    box-sizing: border-box;
    background: #F5F5F5;

    &__form {
        margin-bottom: 20px;
    }

    &__title {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100px;
        margin-top: 20px;
        margin-bottom: 50px;
        font-size: 24px;
        color: #908a8ab3;
        box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
        rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
        rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset,
        rgba(0, 0, 0, 0.06) 0px 2px 1px,
        rgba(0, 0, 0, 0.09) 0px 4px 2px, 
        rgba(0, 0, 0, 0.09) 0px 8px 4px,
        rgba(0, 0, 0, 0.09) 0px 16px 8px,
        rgba(0, 0, 0, 0.09) 0px 32px 16px;
    }

    &__register {
        font-size: 10px;
        text-align: center;
        color: #908a8ab3;
    }
}

</style>
