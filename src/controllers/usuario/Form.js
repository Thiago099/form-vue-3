function possui_acesso_ao_sistema(form)
{
    return form.acesso_sistema == 1;
}
function operacional(form)
{
    return form.tipo_usuario == 1;
}
function solicitante(form)
{
    return form.tipo_usuario == 0;
}
const sim_nao = [['Sim','1'],['Não','0']];
function endereco(prefixo)
{
    return  [
        {
            classe: "col-sm-6 col-md-3",
            title: "CEP",
            name: `${prefixo}_cep`,
        },
        {
            classe: "col-sm-6 col-md-6",
            title: "Logradouro",
            name: `${prefixo}_logradouro`,
        },
        {
            classe: "col-sm-6 col-md-3",
            title: "Núrmero",
            name: `${prefixo}_numero`,
        },
        {
            classe: "col-sm-6 col-md-3",
            title: "Complemento",
            name: `${prefixo}_complemento`,
        },
        {
            classe: "col-sm-6 col-md-3",
            title: "Bairro",
            name: `${prefixo}_bairro`,
        },
        {
            classe: "col-sm-6 col-md-3",
            title: "Cidade",
            name: `${prefixo}_cidade`,
        },
        {
            classe: "col-sm-6 col-md-3",
            title: "Estado",
            name: `${prefixo}_estado`,
            type:"select",
            face:"name",
            back:"value",
            options:[
                {
                    value:'1',
                    name:'MG'
                },
                {
                    value:'1',
                    name:'ES'
                }
            ]
        }
    ]
}
export default[
    {
        title:'Dados Cadastrais',
        data:[
            {
                required: true,
                classe: "col-sm-12 col-md-6",
                title: "Nome",
                name: "nome",
            },
            {
                required: true,
                classe: "col-sm-6 col-md-3",
                title: "Trigrama",
                name: "trigrama",
            },
            {
                classe: "col-sm-6 col-md-3",
                title: "Código ANAC",
                name: "canac",
            },
            {
                required: true,
                classe: "col-sm-6 col-md-3",
                title: "CPF",
                name: "cpf",
            },
            {
                classe: "col-sm-6 col-md-3",
                title: "CREA",
                name: "crea",
            },
            {
                required: true,
                classe: "col-sm-6 col-md-3",
                title: "Celular 1",
                name: "cel",
            },
            {
                classe: "col-sm-6 col-md-3",
                title: "Celular 2",
                name: "cel2",
            },
            {
                classe: "col-sm-6 col-md-4",
                title: "Telefone",
                name: "tel",
            },
            {
                required: true,
                classe: "col-sm-6 col-md-5",
                title: "Email",
                name: "email",
            },
            {
                required: true,
                classe: "col-sm-6 col-md-3",
                title: "Orgao",
                name: "orgao",
                type:"select",
                face:"name",
                back:"value",
                options:[
                    {
                        value:'1',
                        name:'PMMG'
                    },
                    {
                        value:'1',
                        name:'COAER'
                    }
                ]
            }
        ]
    },
    {
        title: 'Acesso ao sistema',
        data:[
            {
                required: true,
                classe: "col-sm-6 col-md-3",
                title: "Possui acesso ao sistema",
                name: "acesso_sistema",
                type:'switch',
                options:sim_nao,
            },
            {
                classe: "col-sm-6 col-md-9",
                type: 'placeholder'
            },
            {
                required: true,
                classe: "col-sm-6 col-md-4",
                title: "Login",
                name: "login",
                visibility:possui_acesso_ao_sistema
            },
            {
                required: true,
                classe: "col-sm-6 col-md-4",
                title: "Senha",
                name: "senha",
                type:"password",
                visibility:possui_acesso_ao_sistema
            },
            {
                required: true,
                classe: "col-sm-6 col-md-4",
                title: "Assinatura digital",
                name: "assinatura_digital",
                type:"password",
                visibility:possui_acesso_ao_sistema
            },
            {
                classe: "col-sm-12 col-md-12",
                title: "Privilégio",
                name: "privilegio",
                default:[],
                type:"multiselect",
                face:"nome",
                setid:"id_estado",
                options:'Estado/get_estado',
                required: true,
                visibility:possui_acesso_ao_sistema
            },
            {
                classe: "col-sm-6 col-md-6",
                title: "Alterar a senha no próximo login?",
                name: "altera_senha",
                type:'switch',
                options:sim_nao,
                visibility:possui_acesso_ao_sistema
            },
            {
                classe: "col-sm-6 col-md-6",
                title: "Alterar Assinatura no próximo login?",
                name: "altera_assinatura",
                type:'switch',
                options:sim_nao,
                visibility:possui_acesso_ao_sistema
            },
            
        ]
    },
    {
        title:'Endereco residencial',
        data: endereco('residencial')
    },
    {
        title:'Endereco Funcional',
        data: endereco('funcional')
    },
    {
        title:'Tipo do usuário',
        data:[
            {
                required: true,
                classe: "col-sm-6 col-md-3",
                title: "Tipo do usuário",
                name: "tipo_usuario",
                type:'switch',
                options:[['Operacional','1'],['Solicitante','0']]
            },
            {
                classe: "col-sm-6 col-md-9",
                type: 'placeholder'
            },
            {
                classe: "col-sm-6 col-md-3",
                title: "Cliente solicitante",
                name: 'cliente_solicitante',
                type:"select",
                face:"name",
                back:"value",
                options:[
                    {
                        value:'1',
                        name:'PMMG'
                    },
                    {
                        value:'1',
                        name:'PMES'
                    }
                ],
                visibility:solicitante
            },
            {
                classe: "col-sm-6 col-md-3",
                title: "Orgão",
                name: 'operacional_orgao',
                type:"select",
                face:"name",
                back:"value",
                options:[
                    {
                        value:'1',
                        name:'PMMG'
                    },
                    {
                        value:'1',
                        name:'PMES'
                    }
                ],
                visibility:operacional
            },
            {
                classe: "col-sm-6 col-md-3",
                title: "Cargo",
                name: 'cargo',
                type:"select",
                face:"name",
                back:"value",
                options:[
                    {
                        value:'1',
                        name:'Diretor'
                    },
                    {
                        value:'1',
                        name:'Supervisor'
                    }
                ],
                visibility:operacional
            },
            {
                classe: "col-sm-6 col-md-3",
                title: "Nome de tratamento",
                name: 'nome_tratamento',
                visibility:operacional
            },
            {
                classe: "col-sm-6 col-md-3",
                title: "Posto graduação",
                name: 'postao_graduacao',
                type:"select",
                face:"name",
                back:"value",
                options:[
                    {
                        value:'1',
                        name:'A'
                    },
                    {
                        value:'1',
                        name:'B'
                    }
                ],
                visibility:operacional
            },
        ]
    },
    {
        title:'Base Contratuais e Transferências',
        visibility:operacional,
        data: [
            {
                classe: "col-sm-6 col-md-3",
                title: "Base contratual",
                name: 'base_contratual',
                type:"select",
                face:"name",
                back:"value",
                options:[
                    {
                        value:'1',
                        name:'A'
                    },
                    {
                        value:'1',
                        name:'B'
                    }
                ]
            },
            {
                classe: "col-sm-6 col-md-3",
                title: "Data",
                name: "data_base",
                type:"date",
            },
        ]
    },
]