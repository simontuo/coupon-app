<template>
    <el-card style="margin-bottom:20px;">
        <div slot="header" class="clearfix">
            <span>关于我</span>
        </div>

        <div class="user-profile">
            <div class="box-center">
                <!-- <pan-thumb
                    :image="supplier.avatar"
                    :height="'100px'"
                    :width="'100px'"
                    :hoverable="false"
                >
                    <div>Hello</div>
                </pan-thumb>-->
            </div>
            <div class="box-center">
                <div class="user-name text-center">{{ supplier.name }}</div>
            </div>
        </div>

        <div class="user-bio">
            <div class="user-education user-bio-section">
                <div class="user-bio-section-header">
                    <svg-icon icon-class="education" />
                    <span>供应商类型</span>
                </div>
                <div class="user-bio-section-body">
                    <div class="text-muted">
                        <el-tag size="small">车队</el-tag>
                        <el-tag size="small">贸易商</el-tag>
                    </div>
                </div>
            </div>

            <div class="user-skills user-bio-section">
                <div class="user-bio-section-header">
                    <svg-icon icon-class="skill" />
                    <span>联系信息</span>
                </div>
                <div class="user-bio-section-body">
                    <div class="progress-item">
                        <span>联系人：{{ supplier.contact }}</span>
                    </div>
                    <div class="progress-item">
                        <span>联系电话：{{ supplier.contact_phone }}</span>
                    </div>
                    <div class="progress-item">
                        <span>联系地址：{{ supplier.contact_address }}</span>
                    </div>
                </div>
            </div>
        </div>
    </el-card>
</template>

<script>
import PanThumb from "@/components/PanThumb";

export default {
    components: { PanThumb },
    props: {
        supplier: {
            type: Object,
            default: () => {
                return {
                    id: "",
                    name: "",
                    mnemonic_code: "",
                    contact: "",
                    contact_phone: "",
                    contact_address: ""
                };
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.box-center {
    margin: 0 auto;
    display: table;
}

.text-muted {
    color: #777;
}

.user-profile {
    .user-name {
        font-weight: bold;
    }

    .box-center {
        padding-top: 10px;
    }

    .user-role {
        padding-top: 10px;
        font-weight: 400;
        font-size: 14px;
    }

    .box-social {
        padding-top: 30px;

        .el-table {
            border-top: 1px solid #dfe6ec;
        }
    }

    .user-follow {
        padding-top: 20px;
    }
}

.user-bio {
    margin-top: 20px;
    color: #606266;

    span {
        padding-left: 4px;
    }

    .user-bio-section {
        font-size: 14px;
        padding: 15px 0;

        .user-bio-section-header {
            border-bottom: 1px solid #dfe6ec;
            padding-bottom: 10px;
            margin-bottom: 10px;
            font-weight: bold;
        }
    }
}

.progress-item {
    margin-top: 5px;
}
</style>
