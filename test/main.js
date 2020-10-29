Vue.config.keyCodes.backspace = 8;
moment.locale("it");

//Vue.config.keyCodes.up = [38, 87];

var vueTest = Vue.component(
	"test",
	Vue.extend({
		template: "#test-template",
		data () {
			return {}
		}
	})
)

var app = new Vue({
	el: "#app",
	data() {
		return {
            customers: [
                { Firstname: 'Cliente 1', Lastname: 'Cognome 1', Phone: '123', Phone2: '456', Status: 'Completato', Price: 67.15, AdvancedPayment: 20 }
            ],
            statuses: ['Completato', 'In corso', 'Non iniziato']
        }
	},
	methods: {
		save () {},
		load () {}
    },
    mounted () {
        for (let i = 2; i < 30; i++) {
            this.customers.push({
                Firstname: 'Cliente ' + i,
                Lastname: 'Cognome ' + i,
                Phone: Math.random().toString(10).substring(2, 12),
                Phone2: Math.random().toString(10).substring(2, 12),
                Status: 'Completato',
                Price: 40 + (parseInt(Math.random() * 26000)/100),
                AdvancedPayment: (parseInt(Math.random() * 5)*10)
            })
        }
    }
})

