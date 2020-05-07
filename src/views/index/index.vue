<template>
    <div>
        <navbar />
        <alert-title></alert-title>
        <div class="container">
            <carousel class="mt-2" />
            <sticky :sticky-top="0" ref="sticky">
                <m-filter :searchFunction="searchFunction" :shadow="shadow" />
            </sticky>
            <el-row class="mt-1" :gutter="10">
                <el-col :span="2">
                    <sticky :sticky-top="60">
                        <m-tab ref="mTab" />
                    </sticky>
                </el-col>
                <el-col :span="22">
                    <card-list ref="cardList" />
                </el-col>
            </el-row>
        </div>
        <back-top />
        <m-footer class="mt-2" />
    </div>
</template>

<script>
import {
    Navbar,
    MFooter,
    Carousel,
    MFilter,
    CardList,
    MTab,
    AlertTitle
} from "./components";
import BackTop from "@/components/BackToTop";
import { goodsPageList } from "@/api/goods";
import Sticky from "@/components/Sticky";

export default {
    components: {
        BackTop,
        Navbar,
        MFooter,
        Carousel,
        MFilter,
        CardList,
        MTab,
        AlertTitle,
        Sticky
    },
    data() {
        return {
            shadow: "never"
        };
    },
    mounted() {
        bus.$on("sticky", response => {
            this.shadow = response.isSticky ? "always" : "never";
        });
    },
    computed: {
        searchFunction() {
            return goodsPageList;
        }
    }
};
</script>

<style lang="scss" scoped>
</style>