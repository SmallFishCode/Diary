<template>
    <TitleBar title="Register" />
    <div class="register">
        <van-form class="register__form" @submit="onSubmit">
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
                    Register
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showFailToast } from 'vant'
import { RegisterReq, registerReq } from '@/server/register'
import TitleBar from '@/components/title-bar.vue'

const router = useRouter()

const username = ref('')
const password = ref('')

const onSubmit = (values: RegisterReq) => {
    if (values) {
        registerReq(values).then(res => {
            if (res.result === 200) {
                username.value = ''
                password.value = ''
                router.push({ path: '/login' })
            }
        }).catch(err => {
            console.log(err)
            showFailToast(err)
        })
    }
}

</script>

<style scoped lang="less">
.register {

    &__back {
        margin-left: 5px;
        color: #908a8ab3;
    }

    &__form {
        margin-top: 20px;
    }
}
</style>
