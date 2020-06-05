import React, { useContext } from 'react';
import styled from 'styled-components';
import Store from '../../store/Store';
import Header from '../../components/organisms/Header';
// import { white } from '../../settings/colors';

const Page = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1024px;
  padding-top: 80px;
  padding-left: 15px;
  padding-right: 15px;

  @media (min-width: 1024px) {
    padding-top: 120px;
    padding-left: 0;
    padding-right: 0;
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-gap: 40px;
  }
`;

const Title = styled.h1`
  position: sticky;
  display: inline-block;
  font-size: 1.25rem;
  line-height: 1.1em;
  color: #ffffff;
  font-weight: 900;
  vertical-align: top;
  margin-right: 40px;
  margin-bottom: 15px;
  
  @media (min-width: 1024px) {
    font-size: 2.375rem;
  }
`;

const TermsWrapper = styled.div`
  display: inline-block;
  color: white;
  padding-top: 9px;
`;

const Paragraph = styled.p`
  color: white;
  font-size: 0.875rem;
  line-height: 1.333em;
  font-weight: 300;
  margin-bottom: 23px;
`;

const Terms = () => {
  const { state } = useContext(Store);

  return (
    <Page>
      <Header
        logged={!!state.user}
      />
      <Title>Termos de Uso</Title>
      <TermsWrapper>
        <Paragraph>
          O&nbsp;
          <strong>Sistema Operacional da Música</strong>
, abaixo denominado apenas “S.O.M.”, que se encontra
localizado à Rua José Bento, nº 106, Cambuci, São Paulo, SP – Brasil, é responsável pela
operação da som.vc, que consiste em uma plataforma de rede social que permite aos membros
criarem perfis profissionais únicos ou coletivos on-line, para que possam manter o contato
com outros músicos e produtores musicais.
        </Paragraph>
        <Paragraph>
          Este Termo de Permissão de Uso e de Política de Privacidade constitui as condições
legalmente aplicáveis ao uso dos Serviços do S.O.M. e pode ser livremente modificado pelos
seus gestores.
        </Paragraph>
        <Paragraph>
          Ao acessar ou usar os Serviços do S.O.M. você deverá aceitar este Termo como vinculante.
Você poderá acessar os Serviços do S.O.M. – caso em que as regras deste Termo serão
aplicáveis – de duas formas diferentes:
        </Paragraph>
        <Paragraph>
          - Como “Visitante”, caso em que você navega nos Serviços do SOM sem a necessidade de ser
  cadastrado no site; ou
          <br />
          - Como “Membro”, quando se cadastra no site e participa dos benefícios oferecidos.
        </Paragraph>
        <Paragraph>
          O termo “Usuário” refere-se tanto a Visitante como a Membro. Você será autorizado
a usar os Serviços do S.O.M., não importando a forma de acesso, somente se aceitar todas as
condições estabelecidas por este Termo.
        </Paragraph>
        <Paragraph>
          Para tornar-se Membro ou fazer uso dos Serviços do S.O.M. você deverá indicar
sua aceitação durante o processo de Cadastro.
        </Paragraph>
        <Paragraph>
          <strong>1. Serviços do S.O.M.:</strong>
        </Paragraph>
        <Paragraph>
          São considerados serviços oferecidos pelo S.O.M. qualquer forma de URL com a marca “SOM”
ou “Sistema Operacional da Música”, bem como:
        </Paragraph>
        <Paragraph>
(i) Cadastro de Perfil e Páginas de artistas no S.O.M.;
          <br />
(ii) Cadastro de eventos no S.O.M.;
          <br />
(iii) Qualquer outro recurso, conteúdo ou aplicativos oferecidos pelo S.O.M.
        </Paragraph>
        <Paragraph>
O S.O.M. se reserva o direito de modificar este Termo a qualquer momento. Cada modificação
entrará em vigor no momento que for divulgada na plataforma do S.O.M.
        </Paragraph>
        <Paragraph>
Todas as modificações serão imediatamente aplicáveis. A continuação do uso dos Serviços do
S.O.M. após as modificações constitui a sua aceitação e vinculação ao Termo modificado.
        </Paragraph>
        <Paragraph>
          <strong>2. Usuário:</strong>
        </Paragraph>
        <Paragraph>
        Para o uso dos Serviços do S.O.M., bem como para a efetivação do cadastro para se tornar um
Membro dos Serviços do S.O.M., você deverá obedecer às seguintes regras:
        </Paragraph>
        <Paragraph>
- Declarar a veracidade de toda informação apresentada no cadastro e demais áreas da
plataforma;
          <br />
- Manter a exatidão da referida informação;
          <br />
- Ter 13 anos de idade ou mais;
          <br />
- Usar os Serviços do S.O.M. sem qualquer espécie de violação da legislação nacional.
        </Paragraph>
        <Paragraph>
Seu perfil poderá ser excluído e seu cadastro ser encerrado sem aviso prévio caso haja o
descumprimento de qualquer dessas regras.
        </Paragraph>
        <Paragraph>
          <strong>3. Prazo:</strong>
        </Paragraph>
        <Paragraph>
Este Termo e qualquer revisão divulgada do presente termo permanecerão em pleno vigor
enquanto estiver em uso dos Serviços do S.O.M.. Você poderá encerrar seu cadastro a
qualquer momento, seguindo as instruções na página de Configurações da Conta do Membro.
        </Paragraph>
        <Paragraph>
O S.O.M. poderá encerrar seu cadastro a qualquer momento, com ou sem aviso prévio, e sem
qualquer obrigação.
        </Paragraph>
        <Paragraph>
O S.O.M. reserva-se o direito, a seu exclusivo critério, de rejeitar, recusar-se a divulgar ou
remover qualquer divulgação de informações, inclusive mensagens privadas, e-mails e
mensagens instantâneas, assim como negar, restringir, suspender, ou encerrar seu acesso a
todos ou qualquer parte dos Serviços do S.O.M. a qualquer momento, com ou sem aviso prévio
ou explicação, e sem qualquer obrigação.
        </Paragraph>
        <Paragraph>
O S.O.M. se reserva ao direito, a seu exclusivo critério, de reestruturar o URL do seu perfil.
        </Paragraph>
        <Paragraph>
O S.O.M. tem o direito de remover seu perfil, assim como negar, restringir, suspender, ou
encerrar seu acesso a todos ou qualquer parte dos Serviços do SOM, a seu exclusivo critério,
caso comprove violação deste Termo ou qualquer tipo de ameaça ao S.O.M., seus
funcionários, parceiros de negócios, usuários ou ao público.
        </Paragraph>
        <Paragraph>
          <strong>4. Uso comercial:</strong>
        </Paragraph>
        <Paragraph>
Os serviços disponibilizados pelo S.O.M. são inteiramente gratuitos.
          <br />
É vedada a cobrança para inscrição em oportunidades cadastradas no S.O.M..
          <br />
O S.O.M. reserva-se ao direito de oferecer produtos e serviços no portal de forma exclusiva,
sendo, portanto, vedado o uso do portal para venda de produtos ou serviços por parte dos
usuários.
        </Paragraph>
        <Paragraph>
          <strong>5. Uso pelos Membros:</strong>
        </Paragraph>
        <Paragraph>
Todos as formas comerciais de utilização da plataforma necessitam obrigatoriamente da
autorização expressa do S.O.M..
        </Paragraph>
        <Paragraph>
É proibido o uso ilegal ou não autorizado dos Serviços do S.O.M., inclusive coleta de nomes de
usuários, números de identificação ou endereços de e-mail de membros por meios eletrônicos.
        </Paragraph>
        <Paragraph>
É vedado o envio de e-mail não solicitado, enquadramento (“framing”) ou links para os Serviços
do SOM, assim como uso de sites promocionais ou software de terceiros para promover perfis.
        </Paragraph>
        <Paragraph>
Os anúncios comerciais, links afiliados, e outras formas de coleta de dados ou de solicitação
não autorizada podem ser removidos de perfis dos membros sem aviso prévio e podem resultar
no encerramento dos privilégios da filiação.
        </Paragraph>
        <Paragraph>
O S.O.M. reserva-se o direito de tomar a medida legal apropriada contra qualquer uso ilegal ou
não autorizado dos Serviços do S.O.M. estando o infrator sujeito às sanções penais e cíveis
decorrentes da violação praticada.
        </Paragraph>
      </TermsWrapper>
    </Page>
  );
};

export default Terms;
