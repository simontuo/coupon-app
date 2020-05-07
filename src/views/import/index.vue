<template>
    <el-upload class="upload-demo" action="/api/v1/goods/import">
        <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
</template>

<script>
import { goodsPageList, goodsImport } from "@/api/goods";
import axios from "axios";

export default {
    data() {
        return {};
    },
    created() {
        goodsPageList({});
    },
    methods: {}
};
</script>