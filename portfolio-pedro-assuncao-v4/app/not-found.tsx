import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container caseCta">
      <p className="eyebrow">Página não encontrada</p>
      <h1>Esse endereço não está por aqui.</h1>
      <p>
        Você pode voltar ao início para ver os serviços e conhecer os projetos.
      </p>
      <Link className="button buttonPrimary" href="/">
        Voltar ao site ↗
      </Link>
    </main>
  );
}
