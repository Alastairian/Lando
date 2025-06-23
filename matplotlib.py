import matplotlib.pyplot as plt

def plot_internal_states(states_list):
    alphas = [s['CoreNode_Alpha'] for s in states_list]
    contradictions = [s['L3_IntCont'] for s in states_list]
    plt.plot(alphas, label='CoreNode Alpha')
    plt.plot(contradictions, label='Internal Contradiction')
    plt.legend()
    plt.show()
