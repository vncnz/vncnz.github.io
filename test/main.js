Vue.config.keyCodes.backspace = 8;
moment.locale("it");

//Vue.config.keyCodes.up = [38, 87];

var vueTest = Vue.component(
    "test",
    Vue.extend({
        template: "#test-template",
        data() {
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
            statuses: ['Completato', 'In corso', 'Non iniziato'],
            dragging: false
        }
    },
    methods: {
        save() {
            let csvContent = "data:text/csv;charset=utf-8," + 
                [["Firstname", "Lastname", "Phone", "Phone2", "Status", "Price", "AdvancedPayment"].join(',')].concat(
                    this.customers.map(cust =>
                        ["Firstname", "Lastname", "Phone", "Phone2", "Status", "Price", "AdvancedPayment"].map(key => cust[key]).join(',')
                    )
                ).join('\r\n')
            var encodedUri = encodeURI(csvContent)
            var link = document.createElement("a")
            link.setAttribute('style', 'display:none')
            link.setAttribute("href", encodedUri)
            link.setAttribute("download", "my_data.csv")
            document.body.appendChild(link) // Required for FF
            link.click()
            link.remove()
        },
        dragover(event) {
            event.preventDefault();
            // Add some visual fluff to show the user can drop its files
            this.dragging = true
        },
        dragleave(event) {
            // Clean up
            this.dragging = false
        },
        drop(event) {
            event.preventDefault();
            // this.$refs.file.files = event.dataTransfer.files;
            if (event.dataTransfer.files.length) {
                this.readFile(event.dataTransfer.files[0])
            }
            // this.onChange(); // Trigger the onChange event manually
            // Clean up
            this.dragging = false
        },
        readFile(file) {
            const reader = new FileReader()
            reader.addEventListener('load', (event) => {
                let customers = this.csvToData(event.target.result)
                this.customers.splice(0, this.customers.length, ...customers)
            })
            reader.readAsText(file)
        },
        csvToData(text) {
            let customers = []
            let lst = text.split('\n')
            let legend = lst.shift()
            let dict_idxToProp = {}
            // let dict_propToIdx = {}
            legend.split(',').forEach((cell, idx) => {
                dict_idxToProp[idx] = cell
                // dict_propToIdx[cell] = idx
            })
            lst.filter(row => row.trim() !== '').forEach(row => {
                let customer = {}
                row.split(',').forEach((cell, idx) => {
                    customer[dict_idxToProp[idx]] = cell
                })
                customers.push(customer)
            })
            return customers
        }
    },
    mounted() {
        for (let i = 2; i < 30; i++) {
            this.customers.push({
                Firstname: 'Cliente ' + i,
                Lastname: 'Cognome ' + i,
                Phone: Math.random().toString(10).substring(2, 12),
                Phone2: Math.random().toString(10).substring(2, 12),
                Status: 'Completato',
                Price: 40 + (parseInt(Math.random() * 26000) / 100),
                AdvancedPayment: (parseInt(Math.random() * 5) * 10)
            })
        }
    }
})