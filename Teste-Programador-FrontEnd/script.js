/*********
 * components
 *********/
// main app menu component
Vue.component("app-menu", {
    template: `
    <nav class="navbar navbar-expand-lg navbar-dak bg-dak">
      <div class="container-fluid">
        <div class="col s12">
        <router-link to="/" class="brand-logo"></router-link>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item"><router-link to="/">Home</router-link></li>
          <li class="nav-item"><router-link to="/cidade">Cidade</router-link></li>
          <li class="nav-item"><router-link to="/estado">Estado</router-link></li>
          <li class="nav-item"><router-link to="/cidadeestado">Cidade Estado</router-link></li>
          <li class="nav-item"><router-link to="/pessoa">Pessoa</router-link></li>

        </ul>
        </div>
      </div>
    </nav>
  `,
});

Vue.component("app-menu2", {
    template: `
    <nav class="navbar">
    <div id="trapezoid">
    <router-link to="/" class="expandHome">Home</router-link>
    <router-link to="/cidade" class="expandHome">Cidade</router-link>
    <router-link to="/estado" class="expandHome">Estado</router-link>
    <router-link to="/cidadeestado" class="expandHome">Pesquisa Cidade e Estado</router-link>
    <router-link to="/pessoa" class="expandHome">Pessoa</router-link>
    <router-link to="/config" class="expandHome">Config</router-link>

    </div>
    
  </nav>
  
 
  `,

});

Vue.component("modal", {
    template: `
    <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-body">
                <slot name="body">
                
                </slot>
                <button class =" myButton" type="button"   @click="$emit('close')">
                    Fechar
                  </button>
              </div>

              <div class="modal-footer">

              </div>
            </div>
          </div>
        </div>
      </transition>
    `,
});

const HomeComponent = {
    template: `
    <div class="container">
    <h2 class="text" id="text">Desafio Desenvolvedor Front End AGROCP 2021</h2> 
    </div>
    
    `,
};

const Cidade = {
    template: `
        <div class="Tabela cidades">
         <div class="container-table">
            <table class="table id="firstTable">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Cidades</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, index ) in rows.slice(0, 10) " :key="index">
                        <td>{{index+1}}</td>
                        <td>{{row.nome}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    `,
    data() {
        return {
            rows: [],
        };
    },
    mounted() {
        axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/32/municipios").then((response) => (this.rows = response.data));
    },
};

const Estado = {
    template: `
    <div class="Tabela cidades">
         <div class="container-table">
            <table class="table id="firstTable">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Estados</th>
                    <th scope="col">Cidades</th>
                    </tr>
                </thead>
                <tbody>
                <tr v-for="(row, index ) in rows.slice(0, 10) " :key="index">
                <td>{{index+1}}</td>
                <td>{{row.nome}}</td>
                <td><button class =" myButton" type="button"  @click="showModal = true, (modalContent(index))">Cidades</button></td>
                </tr>
                </tbody>
            </table>
            <modal v-if="showModal" @close="showModal = false">
                        <a slot="body">
                            <table class="table" id="firstTable">
                                <thead>
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Cidades</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(cidade, index ) in cidades.slice(0, 10) " :key="index">
                                        <td>{{index+1}}</td>
                                        <td>{{cidade.nome}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </a>
                    </modal>
        </div>   `,
    methods: {
        modalContent(index) {
            const title = this.rows[index].id;
            axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + title.toString() + "/municipios").
            then((response) => (this.cidades = response.data));
        },
    },
    data() {
        return {
            rows: [],
            cidades: [],
            showModal: false,
        };
    },
    mounted() {
        axios.get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/").then((response) => (this.rows = response.data));
    },
};

const Pessoa = {

  template: `
  <div class="buscacep">
  <div class="card-form">
      <form class="signup">
          <div class="form-title">CADRASTRO DE PESSOA</div>
          <div class="form-body">
              <div class="row">
                  <label for="fname">Nome:</label>
                  <input type="text" ref="nome" v-model="nome" maxlength="100">

                  <label for="fname">cpf:</label>
                  <input type="text" ref="cpf" v-model="cpf" maxlength="12">

                  <label for="fname">Data:</label>
                  <input type="date" v-model="data" ref="data">
              </div>
              <div class="row">
                  <label for="fname">Cep:</label>
                  <input type="text" ref="cep" v-on:blur="handleInput()" v-model="cep">
                  <label for="fname">Cidade:</label>
                  <input type="text" v-model="cidade">
                  <label for="fname">Estado:</label>
                  <input type="text" v-model="estado">
                  <label for="fname">Bairro :</label>
                  <input type="text" v-model="bairro">
                  <label for="fname">Rua :</label>
                  <input type="text" v-model="rua">
              </div>
              <button class=" myButton" @click="handleInput">Buscar Cep</button>

          </div>
          <div class="rule"></div>
          <div class="form-footer">
              <button class=" myButton" @click="salvardata">Salvar</button>
          </div>

      </form>

  </div>

  <div class="list-group">
      <div class="list-group-item" v-for="pessoas in pessoa">
          <span class="comment__author">Nome: <strong>{{ pessoas.nome }}</strong></span>

          <span class="comment__author">Cpf: <strong>{{ pessoas.cpf }}</strong></span>

          <span class="comment__author">Nascimento: <strong>{{ pessoas.data }}</strong></span>

          <span class="comment__author">Cep: <strong>{{ pessoas.cep }}</strong></span>

          <span class="comment__author">Cidade: <strong>{{ pessoas.cidade }}</strong></span>

          <span class="comment__author">Estado: <strong>{{ pessoas.estado }}</strong></span>

          <span class="comment__author">Rua: <strong>{{ pessoas.rua }}</strong></span>

          <span class="comment__author">Bairro: <strong>{{ pessoas.bairro }}</strong></span>
      </div>
  </div>
  <hr />
</div>
</div>


  `,
  data() {
    return {
        cpf:"",
        data:"",
        nome: "",
        cep: "", 
        cidade: "", 
        estado: "", 
        bairro: "", 
        rua: "", 
        dados: null ,
        pessoa:[
        ] };
      
  },

  methods: {
    handleInput() {
    const cep= this.cep
    axios.get("https://viacep.com.br/ws/"+ this.cep+"/json/").then(response =>{this.dados = response.data});
    this.cidade = this.dados.localidade; 
    this.estado = this.dados.uf; 
    this.bairro = this.dados.bairro; 
    this.rua = this.dados.logradouro; 
    },
    salvardata(){
        let hoje = new Date()
        let ano_atual = hoje.toLocaleDateString('pt-BR', {
            year: 'numeric'
        })
        let ano_velho = this.data.match(/\d{4}/gm)
        let number1 = parseInt(ano_atual),
            number2 = parseInt(ano_velho),
            result = number1 - number2;//Resultado: 110
            console.log(result)
        if (result < 18) {
                alert("Idade minima para cadastro 18 anos");
                return
                }    
        this.pessoa.push({
            nome: this.nome,
            data: this.data,
            cpf: this.cpf,
            cep: this.cep,
            cidade: this.cidade,
            estado: this.estado,
            bairro: this.bairro,
            rua: this.rua,

        });
            this.nome;
             this.data ="";
             this.cpf ="";
             this.cep ="";
             this.cidade ="";
             this.estado =""; 
             this.bairro ="";
             this.rua ="";

    },
},


};

const CidadeEstado = {
    template: `
    <div class="buscacep">
    <div class="card-form">
    <form class="signup">
      <div class="form-title">BUSCAR CEP</div>
      <div class="form-body">
        <div class="row">
        <label  for="fname">CEP:</label>
          <input type="text" v-on:blur="handleInput()" ref="cep" maxlength="9"  v-model="cep">
        </div>
        <div class="row">
        <label for="fname">Cidade:</label>
          <input type="text" v-model="cidade" disabled  >
          <label for="fname">Estado:</label>
          <input type="text" v-model="estado"  disabled >
          <label for="fname">Bairro :</label>
          <input type="text" v-model="bairro" disabled >
          <label for="fname">Rua :</label>
          <input type="text" v-model="rua"   disabled >
  
        </div>
      </div>
      <div class="rule"></div>
      <div class="form-footer">
      <button class =" myButton" @click="handleInput">Buscar</button>
          </div>
    </form>
  </div>
  </div>
    `,
    data() {
      return {
        cep: "", 
        cidade: "", 
        estado: "", 
        bairro: "", 
        rua: "", 
        dados: null ,  
       };
        
    },
  
    methods: {
      handleInput() {
      axios.get("https://viacep.com.br/ws/"+ this.cep+"/json/").then(response =>{this.dados = response.data});
      this.cidade = this.dados.localidade; 
      this.estado = this.dados.uf; 
      this.bairro = this.dados.bairro; 
      this.rua = this.dados.logradouro; 
      
      
    
    
    
    },
   
  },
  
  
  };

const Config = {
    template: `
    <label class="switch">
    <input type="checkbox" id="checkbox" @click="toggleTheme">
    <span class="slider"></span>
  </label>
    
     
    `,
    methods :{
        toggleTheme() {
            var element = document.body;
            console.log(element)
            element.classList.toggle("dark-mode")
        },
    }
   
};
/*********
 * routing
 *********/
const routes = [
    { path: "/", component: HomeComponent },
    { path: "/cidade", component: Cidade },
    { path: "/estado", component: Estado },
    { path: "/cidadeestado", component: CidadeEstado },
    { path: "/pessoa", component: Pessoa },
    { path: "/config", component: Config },

];
const router = new VueRouter({
    routes,
});
/*********
 * main application
 *********/
const app = new Vue({
    el: "#app",
    router,
});
