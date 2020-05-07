import request from "@/utils/request"

export function goodsPageList(query) {
    return request({
        url: '/goods',
        method: 'get',
        params: query
    })
}

export function goodsImport(data) {
    return request({
        url: '/goods/import',
        method: 'post',
        data: data
    })
}

export function goodsCarouselList(query) {
    return request({
        url: '/goods/carousel',
        method: 'get',
        params: query
    })
}

