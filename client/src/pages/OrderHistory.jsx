import { useEffect } from "react"; // Importation de hook useEffect pour gérer les effets secondaires
import Layout from "../Layouts/Layouts"; // Importation du composant Layout pour structurer la page
import { useDispatch, useSelector } from "react-redux"; // Importation des hooks Redux pour accéder à l'état et dispatcher des actions
import { orderListAction } from "../Redux/Actions/Order"; // Importation de l'action pour récupérer la liste des commandes
import moment from "moment"; // Importation de la bibliothèque moment pour formater les dates
import { Loading } from "../components/Loading"; // Importation du composant de chargement pendant la récupération des données

export function OrderHistory() {
  const dispatch = useDispatch(); // Initialisation du dispatch Redux

  // Utilisation de useEffect pour récupérer la liste des commandes au chargement du composant
  useEffect(() => {
    dispatch(orderListAction()); // Appel à l'action pour récupérer la liste des commandes
  }, [dispatch]);

  // Sélection de l'état de la liste des commandes dans le store Redux
  const orderListReducer = useSelector((state) => state.orderListReducer);
  const { orders, loading, error } = orderListReducer; // Extraction des commandes, état de chargement et erreur de la liste des commandes

  return (
    <>
      <Layout>
        {loading ? ( // Si l'état de chargement est true, affiche le composant Loading
          <Loading />
        ) : (
          <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              <div className="mx-auto max-w-5xl">
                <div className="gap-4 sm:flex sm:items-center sm:justify-between">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
                    My orders {/* Titre de la page "My orders" */}
                  </h2>

                  {/* Filtrage des commandes par type et durée */}
                  <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
                    <div>
                      <label
                        htmlFor="order-type"
                        className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select order type {/* Libellé pour le sélecteur de type de commande */}
                      </label>
                      <select
                        id="order-type"
                        className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      >
                        <option selected>All orders</option> {/* Option par défaut "All orders" */}
                        <option value="pre-order">Pre-order</option> {/* Option "Pre-order" */}
                        <option value="transit">In transit</option> {/* Option "In transit" */}
                        <option value="confirmed">Confirmed</option> {/* Option "Confirmed" */}
                        <option value="cancelled">Cancelled</option> {/* Option "Cancelled" */}
                      </select>
                    </div>

                    <span className="inline-block text-gray-500 dark:text-gray-400">
                      {" "}
                      from{" "}
                    </span>

                    {/* Sélecteur de la période de filtrage */}
                    <div>
                      <label
                        htmlFor="duration"
                        className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Select duration {/* Libellé pour le sélecteur de période */}
                      </label>
                      <select
                        id="duration"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                      >
                        <option selected>this week</option> {/* Option "this week" */}
                        <option value="this month">this month</option> {/* Option "this month" */}
                        <option value="last 3 months">the last 3 months</option> {/* Option "last 3 months" */}
                        <option value="lats 6 months">the last 6 months</option> {/* Option "last 6 months" */}
                        <option value="this year">this year</option> {/* Option "this year" */}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Liste des commandes */}
                <div className="mt-6 flow-root sm:mt-8">
                  <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {orders &&
                      orders.map((order) => (
                        <div
                          key={order.id}
                          className="flex flex-wrap items-center gap-y-4 py-6"
                        >
                          {/* Détails de chaque commande */}
                          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                              Order ID:
                            </dt>
                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                              <a href="#" className="hover:underline">
                                #{order._id} {/* Affiche l'ID de la commande */}
                              </a>
                            </dd>
                          </dl>

                          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1 ml-10">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400 ">
                              Date:
                            </dt>
                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                              {moment(order.createdAt).format("MMM Do YY")} {/* Affiche la date de création de la commande formatée */}
                            </dd>
                          </dl>

                          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                              Price:
                            </dt>
                            <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                              ${order.totalPrice} {/* Affiche le prix total de la commande */}
                            </dd>
                          </dl>

                          <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                            <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                              Status:
                            </dt>
                            {/* Affiche le statut de la commande, payé ou non */}
                            <dd
                              className={
                                order.isPaid
                                  ? `"me-2 mt-1.5 inline-flex items-center rounded  bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-300"`
                                  : `"me-2 mt-1.5 inline-flex items-center rounded  bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800 dark:bg-red-900 dark:text-red-300"`
                              }
                            >
                              <svg
                                className="me-1 h-3 w-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="none"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 11.917 9.724 16.5 19 7.5"
                                />
                              </svg>
                              {order.isPaid ? `Paid` : `Not Paid yet`} {/* Affiche "Paid" ou "Not Paid yet" en fonction du statut */}
                            </dd>
                          </dl>

                          {/* Actions disponibles pour la commande */}
                          <div className="w-full grid sm:grid-cols-2 lg:flex lg:w-64 lg:items-center lg:justify-end gap-4">
                            <button
                              type="button"
                              className="w-full rounded-lg bg-primary-700 px-3 py-2 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 lg:w-auto"
                            >
                              Order again {/* Bouton pour commander à nouveau */}
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </Layout>
    </>
  );
}
