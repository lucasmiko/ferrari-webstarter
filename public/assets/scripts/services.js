import { getQueryString } from '../../../utils';
import firebase from './firebase-app'
import { appendTemplate, formatCurrency, setFormValues } from './utils'

let serviceSummary = [];

const renderServiceOptions = (context, serviceOptions) => {

    const optionsEl = context.querySelector('.options');

    optionsEl.innerHTML = '';

    serviceOptions.forEach(item => {

        const label = appendTemplate(optionsEl, 'label', `
        
            <input type="checkbox" name="service" value="${item.id}"  />
            <div class="square">
                <div></div>
            </div>
            <div class="content">
                <span class="name">${item.name}</span>
                <span class="description">${item.description}</span>
                <span class="price">${formatCurrency(item.price)}</span>
            </div>

        `)

        label.querySelector('[type=checkbox]').addEventListener('change', e => {

            const { checked, value } = e.target;

            if (checked) {

                const service = serviceOptions.filter((option) => {

                    return (Number(option.id) === Number(value));
    
                })[0];

                serviceSummary.push(service.id);

            } else {

                serviceSummary = serviceSummary.filter(id => {
                    return Number(id) !== Number(value);
                })

            }  
            
            renderServiceSummary(context, serviceOptions)
            
        })

    })

}

const renderServiceSummary = (context, serviceOptions) => {

    const tbodyEl = context.querySelector("aside tbody");

    tbodyEl.innerHTML = '';
    
    serviceSummary
    .map(id => serviceOptions
        .filter(item =>  Number(item.id) === Number(id))[0])
        .forEach(item => {

          appendTemplate(tbodyEl, 'tr', `
            
                <td>${item.name}</td>
                <td class="price">${formatCurrency(item.price)}</td>
            
            `)
        })

    const totalEl = context.querySelector('footer .total')

    const result = serviceSummary.map(id => {

        return serviceOptions.filter(item => {

            return (Number(item.id) === Number(id))

        })[0];
    });

    const total = result.reduce((totalResult, item) => {

        return Number(totalResult) + Number(item.price);

    }, 0);

    totalEl.innerHTML = formatCurrency(total);
}

document.querySelectorAll("#schedules-services").forEach(page => {

    const db = firebase.firestore()

    db.collection("services").onSnapshot(snapshot => {


        const services = []

        snapshot.forEach(item => {
            services.push(item.data())
        })

        renderServiceOptions(page, services)

    })

    const params = getQueryString()

    setFormValues(page.querySelector('form'), params)

    const buttonSummary = page.querySelector('#btn-summary-toggle')

    buttonSummary.addEventListener("click", () => {
        page.querySelector("aside").classList.toggle('open')
    })

})