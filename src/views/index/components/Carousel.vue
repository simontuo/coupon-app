<template>
    <el-carousel :interval="4000" type="card" height="200px" v-loading="loading">
        <el-carousel-item v-for="(item, index) in items" :key="index">
            <a :href="item.coupon.promote_link" target="_blank">
                <img :src="item.image" class="image" />
            </a>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
import { goodsCarouselList } from "@/api/goods";

export default {
    data() {
        return {
            loading: false,
            items: []
        };
    },
    mounted() {
        this.loading = true;
        goodsCarouselList()
            .then(response => {
                this.items = response.data;
            })
            .finally(() => {
                this.loading = false;
            });
    }
};
</script>

<style lang="scss" scoped>
.image {
    width: 100%;
    display: block;
}

// .el-carousel__item h3 {
//     color: #475669;
//     font-size: 14px;
//     opacity: 0.75;
//     line-height: 200px;
//     margin: 0;
// }

// .el-carousel__item:nth-child(2n) {
//     background-color: #99a9bf;
// }

// .el-carousel__item:nth-child(2n + 1) {
//     background-color: #d3dce6;
// }
</style>