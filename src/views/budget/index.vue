<template>
    <div class="container">
        <el-alert title="所有金额为预估，可以根据自己理解自行修改，得出新的计算结果" type="warning" class="mt-2"></el-alert>
        <sticky :sticky-top="0" ref="sticky" class="info">
            <el-card :body-style="{ padding: '20px 20px 5px 20px' }" shadow="hover">
                <el-row :gutter="15">
                    <el-col :md="8" :xs="24">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="月利润，月营收 - 月成本"
                            placement="top"
                        >
                            <div class="block green">月利润: {{ format(profits) }}</div>
                        </el-tooltip>
                    </el-col>
                    <el-col :md="8" :xs="24">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="月营收，招生人数 x 课时单价 x 月课时"
                            placement="top"
                        >
                            <div class="block blue">月营收: {{ format(revenue) }}</div>
                        </el-tooltip>
                    </el-col>
                    <el-col :md="8" :xs="24">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="月成本，月人员成本 + 月运作成本"
                            placement="top"
                        >
                            <div
                                class="block red"
                            >月成本: {{ format(cost) + ' (' + format(peopleCost) + ' + ' + format(monthlyCost) + ')'}}</div>
                        </el-tooltip>
                    </el-col>
                    <el-col :md="8" :xs="24">
                        <el-tooltip
                            class="item"
                            effect="dark"
                            content="固定成本，初期固定投入成本"
                            placement="top"
                        >
                            <div class="block red">固定成本: {{ format(fixedCost) }}</div>
                        </el-tooltip>
                    </el-col>
                    <el-col :md="8" :xs="24">
                        <div class="block blue">回本周期: {{ format(cycle) + ' 月' }}</div>
                    </el-col>
                </el-row>
            </el-card>
        </sticky>
        <el-card class="info" shadow="hover">
            <el-form ref="form" label-width="120px" :inline="true" label-position="left">
                <el-form-item label="招生人数">
                    <el-input-number
                        v-model="amount"
                        controls-position="right"
                        :min="1"
                        :max="maxAmount"
                        @change="changeAmount"
                    ></el-input-number>
                </el-form-item>
                <el-form-item label="课时单价">
                    <el-input-number
                        v-model="classUnitePrice"
                        controls-position="right"
                        :min="200"
                        :max="9999"
                    ></el-input-number>
                </el-form-item>
                <el-form-item label="月课时">
                    <el-input-number
                        v-model="monthlyClassSize"
                        controls-position="right"
                        :min="4"
                        :max="16"
                        @change="changeMonthlyClassSize"
                    ></el-input-number>
                </el-form-item>
                <el-form-item label="每班人数">
                    <el-input-number
                        v-model="classSize"
                        controls-position="right"
                        :min="6"
                        :max="10"
                        @change="changeSize"
                    ></el-input-number>
                </el-form-item>
                <el-form-item label="场地同时开班数">
                    <el-input-number
                        v-model="classAllowedAmount"
                        controls-position="right"
                        :min="3"
                        :max="10"
                    ></el-input-number>
                </el-form-item>
                <el-form-item label="开班数">
                    <el-input-number
                        v-model="classAmount"
                        controls-position="right"
                        :min="1"
                        disabled
                    ></el-input-number>
                </el-form-item>
            </el-form>
        </el-card>
        <people-costs-card ref="peopleCostsCard" />
        <monthly-costs-card ref="monthlyCostsCard" />
        <fixed-costs-card ref="fixedCostedCard" />
    </div>
</template>

<script>
import PeopleCostsCard from "./components/PeopleCostsCard";
import MonthlyCostsCard from "./components/MonthlyCostCard";
import FixedCostsCard from "./components/FixedCostsCard";
import Sticky from "@/components/Sticky";

export default {
    components: {
        FixedCostsCard,
        MonthlyCostsCard,
        PeopleCostsCard,
        Sticky
    },
    data() {
        return {
            amount: 28,
            classSize: 6,
            classUnitePrice: 300,
            monthlyClassSize: 4,
            classAllowedAmount: 3
        };
    },
    mounted() {
        this.fixedCosts = this.$refs.fixedCostedCard.totalCosts;
    },
    computed: {
        classAmount: {
            get() {
                return this.$store.state.budget.classAmount;
            },
            set() {}
        },
        peopleCost() {
            return this.$store.state.budget.peopleCost;
        },
        monthlyCost() {
            return this.$store.state.budget.monthlyCost;
        },
        cost() {
            let cost =
                this.$store.state.budget.peopleCost +
                this.$store.state.budget.monthlyCost;

            return cost;
        },
        fixedCost() {
            return this.$store.state.budget.fixedCost;
        },
        revenue() {
            return this.amount * this.classUnitePrice * this.monthlyClassSize;
        },
        profits() {
            return this.revenue - this.cost;
        },
        cycle() {
            return Math.ceil(this.fixedCost / this.profits);
        },
        maxAmount() {
            return this.classAllowedAmount * this.classSize * 4 * 4;
        }
    },
    methods: {
        changeAmount() {
            this.$store.dispatch("budget/setAmount", { amount: this.amount });
            this.$refs.peopleCostsCard.refreshRowTotalAmount();
        },
        changeSize() {
            this.$store.dispatch("budget/setClassSize", {
                size: this.classSize
            });
            this.$refs.peopleCostsCard.refreshRowTotalAmount();
        },
        changeMonthlyClassSize() {
            this.$store.dispatch("budget/setMonthlyClassSize", {
                size: this.monthlyClassSize
            });
            this.$refs.peopleCostsCard.refreshRowTotalAmount();
        },
        format(num) {
            var reg = /\d{1,3}(?=(\d{3})+$)/g;
            return (num + "").replace(reg, "$&,");
        }
    }
};
</script>

<style lang="scss" scoped>
.block {
    height: 40px;
    padding: 10px;
    border-radius: 5px;
    color: #909399;
    margin-bottom: 15px;
    background-color: #f2f6fc;
}

.el-input-number {
    z-index: 0;
}

.info {
    margin: 20px 0;
    .green {
        color: #67c23a;
    }
    .blue {
        color: #409eff;
    }
    .red {
        color: coral;
    }
}
</style>