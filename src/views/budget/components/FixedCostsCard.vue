<template>
    <el-card class="costs" :body-style="{ padding: '0px' }" shadow="hover">
        <el-table
            ref="table"
            :data="costItems"
            highlight-current-row
            header-cell-class-name="table-header"
            show-summary
        >
            <el-table-column label="#" type="index" width="50" align="center"></el-table-column>
            <el-table-column label="项目" align="center">
                <template slot="header" slot-scope>
                    <div class="customer-header clearfix">
                        <span>项目</span>
                        <a class="header-icon" @click="addRow">
                            <svg-icon icon-class="add" slot="prepend" />
                        </a>
                    </div>
                </template>
                <template slot-scope="{row}">
                    <el-input
                        v-model="row.label"
                        size="small"
                        suffix-icon="el-icon-edit"
                        @change="changeUnitPrice(row)"
                    />
                </template>
            </el-table-column>
            <el-table-column label="数量" align="center">
                <template slot-scope="{row}">
                    <el-input
                        v-model="row.amount"
                        size="small"
                        suffix-icon="el-icon-edit"
                        @change="changeUnitPrice(row)"
                    />
                </template>
            </el-table-column>
            <el-table-column label="单位" align="center">
                <template slot-scope="{row}">
                    <el-input v-model="row.unit" size="small" suffix-icon="el-icon-edit" />
                </template>
            </el-table-column>
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
                    label: "装修",
                    amount: 1,
                    unit: "套",
                    unitPrice: 150000,
                    totalAmount: 150000
                },
                {
                    label: "租金押金",
                    amount: 1,
                    unit: "套",
                    unitPrice: 20000,
                    totalAmount: 20000
                },
                {
                    label: "工商注册",
                    amount: 1,
                    unit: "个",
                    unitPrice: 3000,
                    totalAmount: 3000
                },
                {
                    label: "办公设备",
                    amount: 2,
                    unit: "套",
                    unitPrice: 3000,
                    totalAmount: 6000
                },
                {
                    label: "教学设备",
                    amount: 3,
                    unit: "套",
                    unitPrice: 5000,
                    totalAmount: 15000
                }
            ]
        };
    },
    mounted() {
        this.$store.dispatch("budget/setFixedCost", {
            totalAmount: this.getTotalCost()
        });
    },
    methods: {
        getTotalCost() {
            let totalAmount = 0;
            for (let i in this.costItems) {
                totalAmount += this.costItems[i].totalAmount;
            }
            return totalAmount;
        },
        changeUnitPrice(row) {
            if (row.amount < 0 || row.amount == "") {
                this.$message.error("数量不能为负数或空值");
                return false;
            }
            if (row.unitPrice < 0 || row.unitPrice == "") {
                this.$message.error("单价不能为负数或空值");
                return false;
            }
            row.totalAmount = row.amount * row.unitPrice;
            this.$store.dispatch("budget/setFixedCost", {
                totalAmount: this.getTotalCost()
            });
        },
        addRow() {
            this.costItems.push({
                label: "",
                amount: 1,
                unit: "",
                unitPrice: 0,
                totalAmount: 0
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.costs {
    margin-bottom: 20px;
}

.customer-header {
    .header-icon {
        float: right;
        line-height: 23px;
        color: #909399;
        margin-right: 10px;
    }
}

.el-input >>> .el-input__inner {
    border: 1px solid #fff;
    text-align: center;
}
</style>