<template>
    <div class="clearfix search-form">
        <el-row :gutter="10">
            <el-col :span="20">
                <el-form
                    :inline="inline"
                    size="small"
                    :label-width="labelWidth"
                    ref="form"
                    label-position="left"
                >
                    <slot name="queryItem"></slot>
                </el-form>
                <el-row v-if="!hidden">
                    <el-divider class="divider"></el-divider>
                    <el-form
                        :inline="inlineHidden"
                        size="small"
                        :label-width="labelWidth"
                        label-position="left"
                    >
                        <slot name="hiddenQueryItem"></slot>
                    </el-form>
                </el-row>
            </el-col>
            <el-col :span="4">
                <div class="search-button">
                    <el-button type="primary" size="small" @click="search()">查询</el-button>
                    <el-button size="small" type="text">重置</el-button>
                    <el-button size="small" :icon="toggleIcon" type="text" @click="handelToggle"></el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getQuery } from "@/utils/search";

export default {
    props: {
        labelWidth: {
            type: String,
            default: "80px"
        },
        inline: {
            type: Boolean,
            default: true
        },
        labelWidthHidden: {
            type: String,
            default: "80px"
        },
        inlineHidden: {
            type: Boolean,
            default: true
        },
        searchFunction: {
            type: Function,
            default: null
        }
    },
    data() {
        return {
            toggleIcon: "el-icon-arrow-down",
            page: 1
        };
    },
    computed: {
        hidden() {
            return this.$store.state.search.hidden;
        }
    },
    created() {
        if (this.searchFunction) {
            this.search();
        }
    },
    mounted() {
        bus.$on("search", response => {
            if (response) {
                this.search(response.page, response.pageSize);
            } else {
                this.search(this.page, this.$store.state.pagination.pageSize);
            }
        });
    },
    methods: {
        handelReset() {},
        handelToggle() {
            this.$store.dispatch("search/toggleHidden");
            let hidden = this.$store.state.search.hidden;
            this.toggleIcon = hidden
                ? "el-icon-arrow-down"
                : "el-icon-arrow-up";
        },
        search(page = 1, pageSize = this.$store.state.pagination.pageSize) {
            // 获取搜索项目组件参数
            let query = {};
            query = getQuery(this.$parent.$parent.$parent.$refs);
            // 分页参数
            this.page = page;
            // 开启搜索加载
            this.$store.dispatch("search/loadingOn");
            // 执行搜索
            this.searchFunction({
                page: page,
                pageSize: pageSize,
                query: query
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
.search-form {
    .divider {
        margin: 0 0 18px 0;
    }
    .search-button {
        float: right;
        margin-bottom: 18px;
    }
}
</style>