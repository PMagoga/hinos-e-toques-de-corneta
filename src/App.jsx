import { useState, useEffect } from "react";

function App() {
  const [midias, setMidias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("toque"); // 'toque' ou 'cancao'
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch("audio/toques.json")
      .then((response) => response.json())
      .then((data) => {
        setMidias(data);
        setCarregando(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar os dados:", error);
        setCarregando(false);
      });
  }, []);

  // Filtra a lista com base no botão que o usuário clicou
  const dadosFiltrados = midias.filter(
    (item) => item.tipo === categoriaSelecionada,
  );

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial, sans-serif",
        maxWidth: "800px",
        margin: "0 auto",
      }}
    >
      {/* Cabeçalho */}
      <header
        style={{
          borderBottom: "2px solid #002f6c",
          paddingBottom: "20px",
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px", // Garante uma distância mínima entre os elementos se eles quebrarem linha
          alignItems: "center", // Centraliza tudo na tela (mude para 'flex-start' se preferir alinhado à esquerda)
          textAlign: "center",
        }}
      >
        {/* Div para juntar o ícone e o título na mesma linha */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap", // Se a tela for pequena, o texto desce sem encavalar
          }}
        >
          <span style={{ fontSize: "40px", lineHeight: "1" }}>📯</span>
          <h1
            style={{
              color: "#002f6c",
              margin: 0,
              fontSize: "32px",
              lineHeight: "1.2", // Garante que se o título quebrar linha, as letras não batam uma na outra
            }}
          >
            Toques de Corneta e Canções Militares
          </h1>
        </div>

        {/* Subtítulo isolado */}
        <p
          style={{
            color: "#555",
            margin: "5px 0 0 0",
            fontSize: "16px",
            lineHeight: "1.4",
          }}
        >
          Acervo digital para instrução e aprendizagem
        </p>
      </header>

      {/* Botões de Seleção (Abas) */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          justifyContent: "center",
        }}
      >
        <button
          onClick={() => setCategoriaSelecionada("toque")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            border: "1px solid #002f6c",
            borderRadius: "4px",
            backgroundColor:
              categoriaSelecionada === "toque" ? "#002f6c" : "#fff",
            color: categoriaSelecionada === "toque" ? "#fff" : "#002f6c",
            fontWeight: "bold",
            transition: "0.2s",
          }}
        >
          Toques de Corneta
        </button>

        <button
          onClick={() => setCategoriaSelecionada("cancao")}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            border: "1px solid #002f6c",
            borderRadius: "4px",
            backgroundColor:
              categoriaSelecionada === "cancao" ? "#002f6c" : "#fff",
            color: categoriaSelecionada === "cancao" ? "#fff" : "#002f6c",
            fontWeight: "bold",
            transition: "0.2s",
          }}
        >
          Hinos e Canções
        </button>
      </div>

      {/* Tabela de Conteúdo */}
      {carregando ? (
        <p style={{ textAlign: "center" }}>Carregando itens...</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr
              style={{
                backgroundColor: "#002f6c",
                color: "#fff",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>
                {categoriaSelecionada === "toque"
                  ? "Nome do Toque"
                  : "Nome da Canção"}
              </th>
              <th
                style={{
                  padding: "12px",
                  borderBottom: "2px solid #ddd",
                  width: "300px",
                }}
              >
                Ouvir / Player
              </th>
            </tr>
          </thead>
          <tbody>
            {dadosFiltrados.length > 0 ? (
              dadosFiltrados.map((item, index) => (
                <tr
                  key={item.id}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  <td
                    style={{
                      padding: "12px",
                      fontWeight: "bold",
                      color: "#333",
                    }}
                  >
                    {item.nome}
                  </td>
                  <td style={{ padding: "12px" }}>
                    <audio controls style={{ width: "100%", height: "40px" }}>
                      <source src={item.arquivo} type="audio/mpeg" />
                      Seu navegador não suporta áudio.
                    </audio>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="2"
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    color: "#666",
                  }}
                >
                  Nenhum item encontrado para esta categoria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
