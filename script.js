let alunos =
JSON.parse(
localStorage.getItem("alunos")
) || [];

let editando = null;

function salvarLocalStorage(){

    localStorage.setItem(
        "alunos",
        JSON.stringify(alunos)
    );
}

function calcularMedia(n1,n2,n3,n4){

    return (
        Number(n1)+
        Number(n2)+
        Number(n3)+
        Number(n4)
    ) / 4;
}

function obterSituacao(media){

    if(media >= 7){

        return "Aprovado";
    }

    else if(media >= 5){

        return "Recuperação";
    }

    return "Reprovado";
}

function adicionarAluno(){

    const nome =
    document.getElementById("nome").value;

    const matricula =
    document.getElementById("matricula").value;

    const turma =
    document.getElementById("turma").value;

    const n1 =
    document.getElementById("n1").value;

    const n2 =
    document.getElementById("n2").value;

    const n3 =
    document.getElementById("n3").value;

    const n4 =
    document.getElementById("n4").value;

    if(
        !nome ||
        !matricula ||
        !turma
    ){
        alert(
        "Preencha os campos!"
        );
        return;
    }

    const media =
    calcularMedia(
        n1,n2,n3,n4
    );

    const situacao =
    obterSituacao(media);

    const aluno = {

        nome,
        matricula,
        turma,
        n1,
        n2,
        n3,
        n4,
        media,
        situacao
    };

    if(editando !== null){

        alunos[editando] = aluno;

        editando = null;
    }

    else{

        alunos.push(aluno);
    }

    limparFormulario();

    salvarLocalStorage();

    renderizar();
}

function renderizar(){

    const lista =
    document.getElementById(
        "listaAlunos"
    );

    lista.innerHTML = "";

    alunos.forEach(
    (aluno,index)=>{

        let classe = "";

        if(
        aluno.situacao ===
        "Aprovado"
        ){

            classe =
            "status-aprovado";
        }

        else if(
        aluno.situacao ===
        "Recuperação"
        ){

            classe =
            "status-recuperacao";
        }

        else{

            classe =
            "status-reprovado";
        }

        lista.innerHTML += `

        <tr>

        <td>${aluno.nome}</td>

        <td>${aluno.turma}</td>

        <td>${aluno.media.toFixed(1)}</td>

        <td class="${classe}">
            ${aluno.situacao}
        </td>

        <td>

        <button
        class="btn-editar"
        onclick="editarAluno(${index})">

        Editar

        </button>

        <button
        class="btn-excluir"
        onclick="excluirAluno(${index})">

        Excluir

        </button>

        </td>

        </tr>

        `;
    });

    atualizarDashboard();
}

function atualizarDashboard(){

    document.getElementById(
    "totalAlunos"
    ).textContent =
    alunos.length;

    document.getElementById(
    "aprovados"
    ).textContent =
    alunos.filter(
    a => a.situacao ===
    "Aprovado"
    ).length;

    document.getElementById(
    "recuperacao"
    ).textContent =
    alunos.filter(
    a => a.situacao ===
    "Recuperação"
    ).length;

    document.getElementById(
    "reprovados"
    ).textContent =
    alunos.filter(
    a => a.situacao ===
    "Reprovado"
    ).length;
}

function excluirAluno(index){

    if(
    confirm(
    "Deseja excluir?"
    )
    ){

        alunos.splice(
        index,
        1
        );

        salvarLocalStorage();

        renderizar();
    }
}

function editarAluno(index){

    const aluno =
    alunos[index];

    document.getElementById(
    "nome"
    ).value =
    aluno.nome;

    document.getElementById(
    "matricula"
    ).value =
    aluno.matricula;

    document.getElementById(
    "turma"
    ).value =
    aluno.turma;

    document.getElementById(
    "n1"
    ).value =
    aluno.n1;

    document.getElementById(
    "n2"
    ).value =
    aluno.n2;

    document.getElementById(
    "n3"
    ).value =
    aluno.n3;

    document.getElementById(
    "n4"
    ).value =
    aluno.n4;

    editando = index;
}

function limparFormulario(){

    document
    .querySelectorAll(
    ".formulario input"
    )
    .forEach(input=>{

       input.value = "";
    });
}

document
.getElementById("pesquisa")
.addEventListener(
"input",
function(){

const termo =
this.value.toLowerCase();

document
.querySelectorAll(
"#listaAlunos tr"
)
.forEach(linha=>{

const texto =
linha.innerText
.toLowerCase();

linha.style.display =
texto.includes(termo)
? ""
: "none";

});

});

renderizar();