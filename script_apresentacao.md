# 🎤 Script de Apresentação — Criação Básica de Threads em Java
### Tempo total: ~6 minutos | Tópico inicial da série

---

> **Como usar este script:**
> Cada bloco tem o tempo estimado e o que você deve estar mostrando na tela.
> Fale com calma — 6 minutos é mais tempo do que parece.
> As falas em *itálico* são opcionais se sobrar tempo.

---

## ⏱️ 0:00 – 0:40 | ABERTURA — Por que threads existem?

**O que mostrar:** Slide 1 ou nada (olhe para a turma)

**Fale assim:**

> "Imagina que você tá usando um aplicativo de música. Você aperta play, a música começa, e ao mesmo tempo você continua navegando pela interface. Como isso é possível sem o app travar?
>
> A resposta é: **threads**.
>
> Uma thread é um **fluxo independente de execução** dentro do mesmo programa. Em vez de fazer uma coisa de cada vez, o Java permite que várias tarefas rodem **simultaneamente**, no mesmo processo, compartilhando memória.
>
> Hoje eu vou mostrar como criar e usar threads do zero."

---

## ⏱️ 0:40 – 1:30 | CONCEITO — Thread e Runnable

**O que mostrar:** Slide 1 (cards de conceito) ou o início do código

**Fale assim:**

> "Em Java, existem **duas formas principais** de criar uma thread.
>
> A primeira é **estender a classe `java.lang.Thread`**. Você cria uma classe que herda de Thread e sobrescreve o método `run()`. É simples, mas tem um problema: Java não permite herança múltipla. Se sua classe já estende outra, você tá bloqueado.
>
> A segunda — e **recomendada** — é **implementar a interface `java.lang.Runnable`**. Você só precisa implementar um método: o `run()`. Depois passa esse Runnable pra dentro de um objeto Thread.
>
> *Isso separa a tarefa em si da mecânica de execução, o que é muito mais limpo.*"

---

## ⏱️ 1:30 – 2:15 | CÓDIGO — A classe Saudacao (Runnable)

**O que mostrar:** `ThreadDemo.java` — bloco da classe `Saudacao`

```java
class Saudacao implements Runnable {
    private String nome;

    public Saudacao(String nome) {
        this.nome = nome;
    }

    @Override
    public void run() {
        for (int i = 1; i <= 3; i++) {
            System.out.println("[" + nome + "] mensagem " + i
                + "  | Thread: " + Thread.currentThread().getName());
        }
    }
}
```

**Fale assim:**

> "Aqui temos a classe `Saudacao` implementando `Runnable`.
>
> O método **`run()`** é onde você coloca o que quer que a thread execute — nesse caso, um loop que imprime o nome da thread 3 vezes.
>
> Repara que eu também imprimo `Thread.currentThread().getName()` — isso vai nos ajudar a ver, na saída, qual thread está executando cada linha."

---

## ⏱️ 2:15 – 3:15 | CÓDIGO — start() vs run() — O ponto mais importante

**O que mostrar:** Bloco do `main()` com `t1.start()` e `t2.start()`

```java
Thread t1 = new Thread(tarefaAlice, "Thread-Alice");
Thread t2 = new Thread(tarefaBob,   "Thread-Bob");

t1.start(); // ← certo: cria novo fio de execução
t2.start();
```

**Fale assim:**

> "Aqui criamos dois objetos `Thread`, passando o `Runnable` e um nome pra cada um.
>
> Aí chamamos **`start()`** — e esse é o detalhe mais importante da apresentação.
>
> Existe uma confusão muito comum: chamar `run()` diretamente ao invés de `start()`.
>
> Quando você chama **`run()`** diretamente, o código executa na thread **atual**, em sequência, sem nenhuma concorrência. É como chamar um método normal.
>
> Quando você chama **`start()`**, o Java cria um **novo fio de execução** e internamente chama `run()` nesse novo fio. Aí sim você tem concorrência de verdade.
>
> Então a regra é simples: **sempre use `start()`**."

---

## ⏱️ 3:15 – 4:00 | CÓDIGO — Extends Thread (alternativa)

**O que mostrar:** Bloco da classe `Contador`

```java
class Contador extends Thread {
    public Contador(String nome) {
        super(nome);
    }

    @Override
    public void run() {
        for (int i = 1; i <= 3; i++) {
            System.out.println("[Contador] " + i
                + "  | Thread: " + Thread.currentThread().getName());
        }
    }
}
```

**Fale assim:**

> "A outra forma é **estender `Thread`** diretamente, como a classe `Contador` aqui.
>
> Funciona igual — você sobrescreve `run()` e chama `start()`.
>
> A diferença é que agora a sua classe **é** uma Thread, enquanto com Runnable, a sua classe **tem** uma tarefa que uma Thread vai executar.
>
> *Pra projetos reais, Runnable é preferido justamente porque não desperdiça a única herança que Java permite.*"

---

## ⏱️ 4:00 – 5:00 | DEMO — Execução e saída na tela

**O que mostrar:** Rodar o código ao vivo, ou mostrar a saída esperada

**Saída esperada (a ordem MUDA a cada execução):**
```
=== INÍCIO — Thread principal: main ===

[Alice] mensagem 1  | Thread: Thread-Alice
[Bob] mensagem 1    | Thread: Thread-Bob
[Alice] mensagem 2  | Thread: Thread-Alice
[Bob] mensagem 2    | Thread: Thread-Bob
[Bob] mensagem 3    | Thread: Thread-Bob
[Alice] mensagem 3  | Thread: Thread-Alice

--- Exemplo B: estendendo Thread ---

[Contador] 1  | Thread: Thread-Contador
[Contador] 2  | Thread: Thread-Contador
[Contador] 3  | Thread: Thread-Contador

=== FIM — Thread principal encerrada ===
```

**Fale assim:**

> "Olha a saída. As mensagens de Alice e Bob aparecem **intercaladas** — a ordem não é garantida. Isso é exatamente o que esperamos de threads rodando ao mesmo tempo.
>
> Se eu rodar de novo, a ordem pode ser diferente. O **scheduler da JVM** decide quando cada thread ganha tempo de CPU, e isso varia a cada execução.
>
> Isso não é bug — é o comportamento correto de código concorrente.
>
> Já o Contador espera porque usamos `join()` — ele garante que a thread principal espera as outras terminarem antes de continuar."

---

## ⏱️ 5:00 – 5:30 | CICLO DE VIDA — Resumo visual

**O que mostrar:** Slide 1 (diagrama do ciclo) ou desenhar no quadro

**Fale assim:**

> "Pra fechar, o ciclo de vida de uma thread em quatro passos:
>
> Você cria com **`new Thread()`** — ela existe, mas não tá rodando.
> Chama **`start()`** — ela entra na fila de prontas.
> O scheduler coloca pra rodar — ela executa **`run()`**.
> Quando `run()` termina — ela vai pra **TERMINATED**.
>
> Simples assim."

---

## ⏱️ 5:30 – 6:00 | FECHAMENTO

**Fale assim:**

> "Então, resumindo o que vimos:
>
> — **`java.lang.Thread`**: a classe que representa um fio de execução.
> — **`java.lang.Runnable`**: a interface que define a tarefa — forma recomendada.
> — **`run()`**: onde fica o código que a thread executa.
> — **`start()`**: o método que você chama pra criar o novo fio de verdade.
>
> Esse é o ponto de partida pra tudo em concorrência Java. A partir daqui os próximos tópicos vão mostrar como **sincronizar** threads e evitar os problemas que surgem quando várias delas compartilham os mesmos dados.
>
> Obrigado."

---

## 📋 Referência rápida — para revisar antes de entrar

| Conceito | O que é | Lembrete |
|---|---|---|
| `Thread` | Classe que representa um fio de execução | Cria, nomeia e inicia threads |
| `Runnable` | Interface com um método: `run()` | Forma recomendada de definir tarefas |
| `run()` | Onde fica o código da tarefa | Nunca chamar diretamente |
| `start()` | Cria o novo fio e chama `run()` internamente | **Sempre usar esse** |
| `join()` | Espera a thread terminar | Útil pra controlar ordem de término |

---

## ⚠️ Pegadinhas para mencionar (se perguntarem)

- **`run()` vs `start()`**: a mais clássica. run() não cria thread nova.
- **Chamar `start()` duas vezes**: lança `IllegalThreadStateException`.
- **Thread não tem ordem garantida**: o scheduler decide, não o programador.
