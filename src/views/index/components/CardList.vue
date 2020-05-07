<template>
    <el-card v-loading="search.loading" :body-style="{ padding: '5px 10px'  }">
        <el-row :gutter="10">
            <el-col :span="6" v-for="(item, index) in search.items" :key="index" class="item">
                <el-card :body-style="{ padding: '0px' }" shadow="hover">
                    <a :href="item.tao_bao_guest_link" target="_blank">
                        <img :src="item.image" class="image" />
                    </a>
                    <div class="goods">
                        <div class="name">{{ item.name }}</div>
                        <div class="price">
                            原价：{{ item.price }} 元
                            <div class="sales">月销量：{{ item.monthly_sales }}</div>
                        </div>
                    </div>
                    <div class="coupon">
                        <div class="price clearfix">
                            券后价：{{ item.coupon_after_price}}元
                            <div class="button">
                                <a :href="item.coupon.promote_link" target="_blank">
                                    <el-button size="mini">领券购买</el-button>
                                </a>
                            </div>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <pagination layout="total, prev, pager, next, jumper" ref="paginate" />
    </el-card>
</template>

<script>
import Pagination from "@/components/Pagination";
import { goodsPageList } from "@/api/goods";

export default {
    components: {
        Pagination
    },
    computed: {
        search() {
            return this.$store.state.search;
        }
    }
};
</script>

<style lang="scss" scoped>
.image {
    width: 100%;
    display: block;
}

.item {
    padding: 5px 0;
    .goods {
        padding: 10px 10px 5px 10px;
        .name {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-bottom: 10px;
        }
        .price {
            color: #999;
            font-size: 12px;
            text-decoration: line-through;
        }

        .sales {
            font-size: 12px;
            color: crimson;
            float: right;
            // line-height: 20px;
        }
    }
    .coupon {
        padding: 5px 10px 10px 10px;
        .price {
            color: coral;
            font-size: 14px;
            line-height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .button {
            float: right;
        }
    }
}

.paginate {
    margin: 0;
}
</style>