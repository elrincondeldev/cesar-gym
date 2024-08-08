export async function getServerSideProps(context: any) {
  const { slug } = context.params;

  // Puedes usar el slug para hacer redirecciones condicionales si es necesario.
  // En este caso, redirigiremos siempre a WhatsApp.

  return {
    redirect: {
      destination: `whatsapp://send?phone=34601506486&text=Hello, this is a test message`,
      permanent: false, // false para redirección temporal
    },
  };
}

export default function Redirect() {
  // Esta página no se renderiza ya que se realiza la redirección.
  return null;
}
