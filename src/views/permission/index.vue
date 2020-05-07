<template>
    <div class="app-container">
        <m-card type="search">
            <search-form slot="body" :searchFunction="searchFunction">
                <template slot="queryItem">
                    <el-form-item label="名称">
                        <s-input ref="name" placeholder="名称"></s-input>
                    </el-form-item>
                    <el-form-item label="标签">
                        <s-input ref="label" placeholder="标签"></s-input>
                    </el-form-item>
                </template>
            </search-form>
        </m-card>
        <m-card type="table" class="mt-2">
            <div slot="body">
                <table-operate-bar title="前台权限数据">
                    <template slot="functionButton">
                        <el-button size="small" @click="create">新增</el-button>
                        <el-button size="small" type="danger" @click="deleteRow">删除</el-button>
                    </template>
                </table-operate-bar>
                <table-selected-bar />
                <m-table class="mt-1" ref="table">
                    <template slot="columns">
                        <el-table-column align="center" type="selection" width="55"></el-table-column>
                        <el-table-column align="center" label="ID" width="55">
                            <template slot-scope="scope">{{ scope.$index }}</template>
                        </el-table-column>
                        <el-table-column label="名称" width="200" align="center">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column label="标签" width="200" align="center">
                            <template slot-scope="scope">{{ scope.row.label }}</template>
                        </el-table-column>
                        <el-table-column label="描述" align="center">
                            <template slot-scope="scope">{{ scope.row.desc }}</template>
                        </el-table-column>
                        <el-table-column align="center" prop="created_at" label="创建时间" width="200">
                            <template slot-scope="scope">
                                <i class="el-icon-time" />
                                <span>{{ scope.row.created_at }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="edit(scope.row.id)">查看</el-button>
                            </template>
                        </el-table-column>
                    </template>
                </m-table>
                <pagination />
            </div>
        </m-card>
        <create-drawer ref="createDrawer"></create-drawer>
        <edit-drawer ref="editDrawer"></edit-drawer>
    </div>
</template>

<script>
import Pagination from "@/components/Pagination";
import TableOperateBar from "@/components/TableOperateBar";
import TableSelectedBar from "@/components/TableSelectedBar";
import MTable from "@/components/MTable";
import SearchForm from "@/components/SearchForm";
import MCard from "@/components/MCard";
import { permissionPageList, permissionBatchDelete } from "@/api/permission";
import CreateDrawer from "./components/CreateDrawer";
import EditDrawer from "./components/EditDrawer";
import { SInput } from "@/components/SearchItem";

export default {
    components: {
        Pagination,
        TableOperateBar,
        TableSelectedBar,
        MTable,
        SearchForm,
        MCard,
        CreateDrawer,
        EditDrawer,
        SInput
    },
    data() {
        return {};
    },
    computed: {
        searchFunction() {
            return permissionPageList;
        },
        selectedIds() {
            return this.$refs.table.selectedIds();
        }
    },
    methods: {
        create() {
            this.$refs.createDrawer.show("权限新增");
        },
        edit(id) {
            this.$refs.editDrawer.id = id;
            this.$refs.editDrawer.show("权限详情");
        },
        deleteRow() {
            if (this.selectedIds.length < 1) {
                this.$message({
                    message: "请选择需要删除的数据",
                    type: "warning"
                });
                return false;
            }
            permissionBatchDelete(this.selectedIds).then(response => {
                this.$message({
                    message: response.message,
                    type: "success"
                });
                bus.$emit("search");
            });
        }
    }
};
</script>

<style lang="scss" scoped>
</style>

