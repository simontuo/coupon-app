<template>
    <div class="app-container">
        <m-card type="search">
            <search-form ref="searchForm" slot="body" :searchFunction="searchFunction">
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
        <m-card class="mt-2">
            <div slot="body" ref="tableData">
                <table-operate-bar title="前台角色数据">
                    <template slot="functionButton">
                        <router-link :to="{name: 'roleCreate'}">
                            <el-button size="small">新增</el-button>
                        </router-link>
                        <el-button
                            size="small"
                            type="danger"
                            @click="deleteRow"
                            class="operate-bar-btn"
                        >删除</el-button>
                    </template>
                </table-operate-bar>
                <table-selected-bar selected="50" />
                <m-table class="mt-1" ref="table">
                    <template slot="columns">
                        <el-table-column align="center" type="selection" width="55"></el-table-column>
                        <el-table-column align="center" label="ID" width="55">
                            <template slot-scope="scope">{{ scope.$index }}</template>
                        </el-table-column>
                        <el-table-column label="名称" width="200">
                            <template slot-scope="scope">{{ scope.row.name }}</template>
                        </el-table-column>
                        <el-table-column label="标签" width="200" align="center">
                            <template slot-scope="scope">
                                <span>{{ scope.row.label }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column align="center" prop="created_at" label="创建于">
                            <template slot-scope="scope">
                                <i class="el-icon-time" />
                                <span>{{ scope.row.created_at }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="100" align="center">
                            <template slot-scope="scope">
                                <router-link :to="{name: 'roleProfile'}">
                                    <el-button type="text" size="small">查看</el-button>
                                </router-link>
                                <el-button
                                    type="text"
                                    size="small"
                                    @click="bindUser('绑定用户', scope.row.id)"
                                >绑定</el-button>
                            </template>
                        </el-table-column>
                    </template>
                </m-table>
                <pagination />
            </div>
        </m-card>
        <bind-user ref="bindUser" />
    </div>
</template>

<script>
import { rolePageList, roleDelete } from "@/api/role";
import Pagination from "@/components/Pagination";
import SearchForm from "@/components/SearchForm";
import TableOperateBar from "@/components/TableOperateBar";
import TableSelectedBar from "@/components/TableSelectedBar";
import MCard from "@/components/MCard";
import MTable from "@/components/MTable";
import BindUser from "./components/BindDrawer";
import { SInput } from "@/components/SearchItem";

export default {
    components: {
        Pagination,
        TableOperateBar,
        TableSelectedBar,
        MTable,
        SearchForm,
        MCard,
        BindUser,
        SInput
    },
    data() {
        return {
            query: {
                name: "",
                label: ""
            }
        };
    },
    computed: {
        searchFunction() {
            return rolePageList;
        },
        selectedIds() {
            return this.$refs.table.selectedIds();
        }
    },
    methods: {
        bindUser(title, id) {
            this.$refs.bindUser.id = id;
            this.$refs.bindUser.show(title);
        },
        deleteRow() {
            if (this.selectedIds.length < 1) {
                this.$message({
                    message: "请选择需要删除的数据",
                    type: "warning"
                });
                return false;
            }
            roleDelete(this.selectedIds).then(response => {
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