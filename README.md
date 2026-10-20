| ID do Caso | Descrição | Status | Comentários |
|---|---|---|---|
| CT03 | Rejeitar ID negativo | Passou | Deve lançar `Error`. |
| CT04 | Rejeitar ID não inteiro | Passou | Testar, por exemplo, `1.5`. |
| CT16 | Verificar permissão de gerenciamento do administrador | Passou | `canManageUsers()` deve retornar `true`. |
| CT18 | Verificar permissão de gerenciamento do supervisor | Passou | `canManageUsers()` deve retornar `false`. |
| CT20 | Criar funcionário com dados válidos | Passou | Verificar salário, departamento e perfil `EMPLOYEE`. |
| CT21 | Rejeitar salário igual a zero | Passou | Deve lançar `Error`. |
| CT40 | Rejeitar busca por e-mail vazio | Passou | Deve lançar `Error`. |
| CT49 | Limpar o armazenamento | Passou | Após `clear()`, a lista deve estar vazia e a contagem deve ser zero. |
| CT51 | Rejeitar criação do serviço com armazenamento inválido | Passou | Deve lançar `Error`. |
| CT57 | Rejeitar cadastro de funcionário sem salário | Passou | Deve lançar `Error`. |
| CT74 | Executar a busca por ID | Passou | Conferir resultado válido e erro para ID inexistente. |