<template>
  <div class="grid grid-cols-3 gap-2 h-full">
    <div class="col-span-2 border-2 p-4 h-full">
      <h1 class="text-xl mb-4">今日支出</h1>
      <table class="table-fixed w-full">
        <thead>
          <tr class="text-left">
            <th class="w-1/3">#</th>
            <th class="w-1/3">時間</th>
            <th class="w-1/3">支出項目</th>
            <th class="w-1/3">金額</th>
            <th class="w-1/3">動作</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="({ expendItem, time, expend, id }, index) in list"
            :key="id"
          >
            <td>
              {{ index + 1 }}
            </td>
            <td>
              {{ time }}
            </td>
            <td>{{ expendItem.text }}</td>
            <td>{{ expend }}元</td>
            <td>
              <button class="px-2 py-1 border" @click="removeList(id)">
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex flex-col h-full justify-between">
      <div class="card flex flex-col">
        <h1 class="text-xl mb-4">快速新增</h1>
        <div class="grid grid-row-3 h-full">
          <input
            required
            class="border-2"
            type="time"
            name="tiem"
            v-model="form.time"
          />
          <div class="border-2 flex" style="max-height: 32px">
            <select
              required
              name="expendItem"
              v-model="form.expendItem"
              class="w-full"
            >
              <option value="" disabled selected>請選擇支出項目</option>
              <option v-for="item in options" :value="item" :key="item.value">
                {{ item.text }}
              </option>
            </select>
          </div>
          <input
            class="border-2"
            v-model="form.expend"
            type="number"
            name="expend"
            placeholder="支出金額"
            required
            min="1"
          />
        </div>
        <button class="btn" @click="addList" :disabled="btnRule">新增</button>
      </div>
      <div class="card">
        <h1 class="text-xl mb-8">今日可用額度</h1>
        <div :class="`circle text-white ${budgetColor}`">{{ newBudget }}元</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: 0,
        time: `${new Date().getHours()}:${new Date().getMinutes()}`,
        expendItem: "",
        expend: "",
      },
      options: [
        {
          text: "飲食",
          value: "eat",
        },
        {
          text: "交通",
          value: "traffic",
        },
        {
          text: "娛樂",
          value: "recreation",
        },
      ],
      list: [],
    };
  },
  computed: {
    btnRule() {
      if (
        this.form.time &&
        this.form.expendItem?.text &&
        /^[1-9][0-9]*$/.test(this.form.expend)
      )
        return false;
      else return true;
    },
    budget() {
      return this.$store.state.budget;
    },
    newBudget() {
      return this.$store.state.newBudget;
    },
    budgetColor() {
      if (this.newBudget > this.budget * 0.5) return "bg-blue-600";
      else if (this.newBudget < 0) return "bg-red-500";
      else return "bg-warning";
    },
    rowList() {
      return this.$store.state.list;
    },
  },
  mounted() {
    this.list = Array.from(this.rowList);
  },
  watch: {
    list(v) {
      this.calculate(v);
      this.$store.commit("setList", v);
      if (v.length === 0) this.$store.commit("calculate", this.budget);
    },
  },
  methods: {
    addList() {
      this.list.push({ id: this.form.id++, ...this.form });
    },
    removeList(v) {
      const index = this.list.findIndex((x) => x.id === v);
      this.list.splice(index, 1);
    },
    calculate(v) {
      let budget = this.budget;

      v.forEach((ele) => {
        budget = budget - ele.expend;
        this.$store.commit("calculate", budget);
      });
    },
  },
};
</script>
