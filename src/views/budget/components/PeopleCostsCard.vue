<template>
    <el-card class="costs" :body-style="{ padding: '0px' }" shadow="hover">
        <el-table
            :data="costItems"
            highlight-current-row
            header-cell-class-name="table-header"
            show-summary
        >
            <el-table-column label="#" type="index" width="50" align="center"></el-table-column>
            <el-table-column label="项目" prop="label" align="center"></el-table-column>
            <el-table-column label="数量" prop="amount" align="center"></el-table-column>
            <el-table-column label="单位" prop="unit" align="center"></el-table-column>
            <el-table-column label="课时" prop="classSize" align="center"></el-table-column>
            <el-table-column min-width="300px" label="单价" align="center">
                <template slot-scope="{row}">
                    <el-input
                        v-model="row.unitPrice"
                        size="small"
                        suffix-icon="el-icon-edit"
                        @change="changeUnitPrice(row)"
                    />
                </template>
            </el-table-column>
            <el-table-column label="总价" width="100px" prop="totalAmount" align="center"></el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
    data() {
        return {
            costItems: [
                {
                    label: "外教薪酬",
                    amount: 1,
                    unit: "节",
                    classSize: 4,
                    unitPrice: 300,
                    totalAmount: 300
                },
                {
                    label: "助教薪酬",
                    amount: 1,
                    unit: "节",
                    classSize: 4,
                    unitPrice: 150,
                    totalAmount: 150
                },
                {
                    label: "交通补贴",
                    amount: 1,
                    unit: "个",
                    classSize: 4,
                    unitPrice: 200,
                    totalAmount: 200
                }
            ]
        };
    },
    mounted() {
        this.refreshRowTotalAmount();
    },
    methods: {
        refreshRowTotalAmount() {
            for (let i in this.costItems) {
                this.costItems[i].amount = this.$store.state.budget.classAmount;
                this.costItems[
                    i
                ].classSize = this.$store.state.budget.monthlyClassSize;
                this.costItems[i].totalAmount =
                    this.costItems[i].amount *
                    this.costItems[i].classSize *
                    this.costItems[i].unitPrice;
            }
            this.$store.dispatch("budget/setPeopleCost", {
                totalAmount: this.getTotalCost()
            });
        },
        getTotalCost() {
            let totalAmount = 0;
            for (let i in this.costItems) {
                totalAmount += this.costItems[i].totalAmount;
            }
            return totalAmount;
        },
        changeUnitPrice(row) {
            row.totalAmount = row.amount * row.unitPrice;
            this.$store.dispatch("budget/setPeopleCost", {
                totalAmount: this.getTotalCost()
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.costs {
    margin-bottom: 20px;
}

.el-input >>> .el-input__inner {
    border: 1px solid #fff;
    text-align: center;
}
</style>