<template>
  <div class="app-container">
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
      check-strictly
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button type="text" size="mini" @click="() => edit(data)">
            Edit
          </el-button>
          <el-button type="text" size="mini" @click="() => append(data)">
            Append
          </el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)">
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
let id = 1000;

export default {
  data() {
    const data = [
      {
        id: 1,
        label: "所有功能",
        children:[
            {
                id:2,
                label:"人员管理",
                children:[
                    {
                        id:4,
                        label:"添加人员信息"
                    },
                    {
                        id:5,
                        label:"编辑人员信息"
                    },
                    {
                        id:6,
                        label:"删除人员信息"
                    },
                    {
                        id:7,
                        label:"筛选人员信息"
                    }
                ]
            },
            {
                id:3,
                label:"部门管理",
                children:[
                    {
                        id:8,
                        label:"权限管理"
                    },
                    {
                        id:9,
                        label:"角色管理"
                    },
                    {
                        id:10,
                        label:"菜单管理"
                    }
                ]
            }
        ]
      }
    ];

    return {
      data: JSON.parse(JSON.stringify(data)),
    };
  },

  methods: {
    edit(data){
      alert('功能开发中')
      // data.label = "edit test"
    },
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex((d) => d.id === data.id);
      children.splice(index, 1);
    }
  },
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  padding-right: 8px;
}
</style>