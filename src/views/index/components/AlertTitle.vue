<template>
    <!-- <el-alert :title="alertTile" type="info" center show-icon></el-alert> -->
    <div class="title" v-show="show">
        <div class="info">
            <div class="count">
                <svg-icon icon-class="coupons" class="icon" />
                <span>优惠券收录</span>
                <count-to
                    ref="countTo"
                    :start-val="_startVal"
                    :end-val="_endVal"
                    :duration="_duration"
                    :decimals="_decimals"
                    :separator="_separator"
                    :prefix="_prefix"
                    :suffix="_suffix"
                    :autoplay="false"
                    class="count-to"
                />
                <!-- <span>张，距下次更新还有</span>
                <span class="time">{{countDownList}}</span>
                <span>。</span>-->
                <div class="close">
                    <a @click="show = false">
                        <svg-icon icon-class="close" class="icon" />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import countTo from "vue-count-to";

export default {
    components: {
        countTo
    },
    data() {
        return {
            show: true,
            setStartVal: 0,
            setEndVal: 2017,
            setDuration: 4000,
            setDecimals: 0,
            setSeparator: ",",
            setSuffix: " ",
            setPrefix: " ",
            countDownList: "00天00时00分00秒",
            actEndTime: "2020-05-05 10:00:00"
        };
    },
    computed: {
        search() {
            return this.$store.state.search;
        },
        _startVal() {
            if (this.setStartVal) {
                return this.setStartVal;
            } else {
                return 0;
            }
        },
        _endVal() {
            if (this.$store.state.search) {
                return this.$store.state.search.total;
            } else {
                return 0;
            }
        },
        _duration() {
            if (this.setDuration) {
                return this.setDuration;
            } else {
                return 100;
            }
        },
        _decimals() {
            if (this.setDecimals) {
                if (this.setDecimals < 0 || this.setDecimals > 20) {
                    alert("digits argument must be between 0 and 20");
                    return 0;
                }
                return this.setDecimals;
            } else {
                return 0;
            }
        },
        _separator() {
            return this.setSeparator;
        },
        _suffix() {
            return this.setSuffix;
        },
        _prefix() {
            return this.setPrefix;
        }
    },
    mounted() {
        this.$refs.countTo.start();
        this.countDown();
    },
    methods: {
        start() {
            this.$refs.countTo.start();
            this.countDown();
        },
        pauseResume() {
            this.$refs.countTo.pauseResume();
        },
        timeFormat(param) {
            return param < 10 ? "0" + param : param;
        },
        countDown(it) {
            var interval = setInterval(() => {
                // 获取当前时间，同时得到活动结束时间数组
                let newTime = new Date().getTime(); // 对结束时间进行处理渲染到页面
                let endTime = new Date(this.actEndTime).getTime();
                let obj = null; // 如果活动未结束，对时间进行处理
                if (endTime - newTime > 0) {
                    let time = (endTime - newTime) / 1000; // 获取天、时、分、秒
                    let day = parseInt(time / (60 * 60 * 24));
                    let hou = parseInt((time % (60 * 60 * 24)) / 3600);
                    let min = parseInt(((time % (60 * 60 * 24)) % 3600) / 60);
                    let sec = parseInt(((time % (60 * 60 * 24)) % 3600) % 60);
                    obj = {
                        day: this.timeFormat(day),
                        hou: this.timeFormat(hou),
                        min: this.timeFormat(min),
                        sec: this.timeFormat(sec)
                    };
                } else {
                    // 活动已结束，全部设置为'00'
                    obj = {
                        day: "00",
                        hou: "00",
                        min: "00",
                        sec: "00"
                    };
                    clearInterval(interval);
                }
                this.countDownList =
                    obj.day +
                    "天" +
                    obj.hou +
                    "时" +
                    obj.min +
                    "分" +
                    obj.sec +
                    "秒";
            }, 1000);
        }
    }
};
</script>

<style lang="scss" scoped>
.title {
    padding: 10px;
    text-align: center;
    font-size: 14px;
    background-color: #e4e7ed;
    .info {
        .icon {
            margin-right: 5px;
        }
        .count-to {
            color: #f6416c;
            margin: 10px 0;
            text-align: center;
            font-weight: 500;
        }
        .time {
            color: #f6416c;
        }
        .close {
            float: right;
            line-height: 20px;
            color: #909399;
        }
    }
}
</style>