import Mock from 'mockjs'

const data = Mock.mock({
    'items|10': [{
        "id|+1": 1,
        name: '@name',
        label: '@cname',
    }]
})

export default [
    {
        url: '/permissions/list',
        type: 'get',
        response: config => {

            const items = data.items

            for (let index in items) {
                let children = Mock.mock({
                    'children|1-3': [
                        {
                            "id|11-100": 100,
                            name: '@name',
                            label: '@cname',
                            children: []
                        }
                    ]
                })
                items[index]['children'] = children.children;
            }

            return {
                code: 20000,
                data: {
                    total: items.length,
                    items: items
                }
            }
        }
    },

    {
        url: '/permissions/[0-9]*',
        type: 'get',
        response: config => {
            const { id } = config.query

            let data = {
                id: id,
                name: '@name',
                label: '@cname',
                desc: "@cword"
            }

            return {
                code: 20000,
                data: data
            }
        }
    },

    {
        url: '/permissions/[0-9]*',
        type: 'put',
        response: config => {
            return {
                code: 20000,
                message: "保存成功"
            }

        }
    },

    {
        url: '/permissions/delete',
        type: 'delete',
        response: config => {
            return {
                code: 20000,
                message: "删除成功"
            }

        }
    },

    {
        url: '/permissions',
        type: 'post',
        response: config => {
            return {
                code: 20000,
                message: "新增成功"
            }

        }
    },

    {
        url: '/permissions',
        type: 'get',
        response: config => {

            const { query, page = 1, pageSize = 20 } = config.query

            const list = Mock.mock({
                'items|150': [
                    {
                        id: '@increment',
                        name: '@name',
                        label: '@cname',
                        created_at: '@datetime',
                    }
                ]
            });

            let sortItems = list.items.reverse();

            const items = sortItems.filter((item, index) => index < pageSize * page && index >= pageSize * (page - 1));

            return {
                code: 20000,
                data: {
                    total: list.items.length,
                    items: items
                }
            }
        }
    }
]