<template>
    <el-card shadow="hover" class="tab-list" :body-style="{ padding: '0px' }">
        <ul class="list">
            <li
                v-for="(tag, index) in tags"
                :key="index"
                :class="{'item': true, 'active': active === tag.name}"
            >
                <el-button type="text" size="mini" @click="activeTab(tag.name, tag.label)">
                    <svg-icon :icon-class="tag.name" class="icon" />
                    {{ tag.label}}
                </el-button>
            </li>
        </ul>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            tags: [
                {
                    id: 1,
                    name: "women-clothing",
                    label: "女装"
                },
                {
                    id: 2,
                    name: "men-clothing",
                    label: "男装"
                },
                {
                    id: 3,
                    name: "shoes",
                    label: "鞋子"
                },
                {
                    id: 4,
                    name: "bags",
                    label: "箱包"
                },
                {
                    id: 5,
                    name: "baby",
                    label: "母婴"
                },
                {
                    id: 6,
                    name: "makeup",
                    label: "美妆"
                },
                {
                    id: 7,
                    name: "home",
                    label: "居家"
                },
                {
                    id: 7,
                    name: "home-textile",
                    label: "家纺"
                }
            ],
            active: ""
        };
    },
    methods: {
        activeTab(name, label) {
            this.active = name;
            bus.$emit("search", {
                level_1_category: label
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.tab-list {
    text-align: center;
    .list {
        display: block;
        list-style-type: none;
        margin-block-start: 0;
        margin-block-end: 0;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 0px;
        .active {
            background-color: coral;
            border-bottom: 0px solid #f2f6fc;
            .icon {
                margin-right: 0;
                font-size: 16px;
            }
            .el-button--text {
                color: #fff;
                font-size: 16px;
            }
        }
    }

    .item {
        border-radius: 2px;
        // margin: 5px 0px;

        .icon {
            margin-right: 2px;
        }
        .el-button--text {
            color: #606266;
            font-size: 14px;
        }

        padding: 5px 0px;

        border-bottom: 1px solid #f2f6fc;
    }
}
</style>