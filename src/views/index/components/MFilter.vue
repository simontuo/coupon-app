<template>
    <el-card type="cost" :body-style="{ padding: '5px 15px'  }" :shadow="shadow">
        <div class="filter clearfix">
            <div class="info">
                <el-input v-model="query.key" placeholder="请输入内容" @keyup.enter.native="search">
                    <svg-icon class-name="search-icon" icon-class="search" slot="prepend" />
                </el-input>
            </div>
            <div class="button">
                <!-- <el-button type="text" @click="orderBy('coupons_price')">
                    优惠
                    <svg-icon icon-class="down-light" class="icon" />
                </el-button>-->
                <el-button type="text" @click="orderBy('monthly_sales')">
                    销量
                    <svg-icon icon-class="down-light" class="icon" />
                </el-button>
                <el-button type="text" @click="orderBy('price')">
                    价格
                    <svg-icon icon-class="up" class="icon" />
                </el-button>
            </div>
        </div>
    </el-card>
</template>

<script>
import Search from "@/components/HeaderSearch";

export default {
    props: {
        searchFunction: {
            type: Function,
            default: null
        },
        shadow: {
            type: String,
            default: "never"
        }
    },
    components: {
        Search
    },
    data() {
        return {
            page: 1,
            pageSize: 20,
            query: {
                key: "",
                level_1_category: ""
            }
        };
    },
    mounted() {
        this.search();
        let pageSize = this.pageSize;
        this.$store.dispatch("pagination/changePageSize", { pageSize });
        bus.$on("search", response => {
            if (response.page) {
                this.search(response.page, response.pageSize);
            } else {
                this.query.level_1_category = response.level_1_category;
                this.search(this.page, this.pageSize);
            }
        });
    },
    methods: {
        orderBy(type) {
            this.query.order_by = type;
            this.search();
        },
        search(page = 1, pageSize = this.pageSize) {
            // 开启搜索加载
            this.$store.dispatch("search/loadingOn");
            // 执行搜索
            this.searchFunction({
                page: page,
                pageSize: pageSize,
                query: this.query
            })
                .then(response => {
                    // 缓存搜索数据
                    this.$store.dispatch("search/getData", { response });
                })
                .finally(() => {
                    // 关闭搜索加载
                    this.$store.dispatch("search/loadingOff");
                });
        }
    }
};
</script>

<style lang="scss" scoped>
.filter {
    .info {
        float: left;
        line-height: 40px;
        .searc-item {
            color: coral;
        }
        .icon {
            margin-right: 5px;
        }
        .count-to {
            color: #f6416c;
            margin: 10px 0;
            text-align: center;
            font-size: 18px;
            font-weight: 500;
        }
        .time {
            color: #f6416c;
        }
    }
    .button {
        .el-button {
            color: #909399;
        }
        float: right;
    }
    .el-input >>> .el-input-group__prepend {
        border: 0;
        background-color: #fff;
        color: coral;
        padding-left: 0px;
        padding-right: 10px;
        font-size: 16px;
    }
    .el-input >>> .el-input__inner {
        font-size: 16px;
        border-radius: 0;
        border: 0;
        padding-left: 0;
        padding-right: 0;
        box-shadow: none !important;
        vertical-align: middle;
    }
}
</style>